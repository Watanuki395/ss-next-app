import { supabase } from "../../supabase";

export const saveUsers = async (collectionName, newUser) => {
  const { data, error } = await supabase
    .from(collectionName)
    .insert([newUser])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateInfo = async (id, collectionName, updatedFields) => {
  const { data, error } = await supabase
    .from(collectionName)
    .update(updatedFields)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
};

export const onGetLinks = (collectionName, callback) => {
  // Supabase realtime subscription
  const channel = supabase
    .channel(`${collectionName}_changes`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: collectionName },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel);
  };
};

export const getGamesByUserId = (userId, callback) => {
  if (!userId) {
    // No user id provided - immediately callback with empty array and no subscription
    console.warn('getGamesByUserId called with empty userId');
    callback([]);
    return () => {};
  }
  // Initial fetch
  const fetchGames = async () => {
    const { data: games, error } = await supabase
      .from('games')
      .select('*')
      .contains('players', [{ id: userId }]);

    if (error) {
      console.error('Error getting games for user', userId, error);
      // Ensure the callback always gets called so UI can update
      callback([]);
      return;
    }

    if (!error) {
      callback(games || []);
    }
  };

  fetchGames();

  // Setup realtime subscription
  const channel = supabase
    .channel('games_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'games' },
      async () => {
        await fetchGames();
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel);
  };
};

export const getDocWhereGameId = (collectionName, gameId, callback) => {
  try {
    // Initial fetch
    const fetchGame = async () => {
      const { data, error } = await supabase
        .from(collectionName)
        .select('*')
        .eq('id', gameId)
        .single();

      if (error) {
        callback({
          success: false,
          message: "No se encontró ningún juego con el ID proporcionado.",
        });
      } else {
        callback({
          success: true,
          data: data,
        });
      }
    };

    fetchGame();

    // Setup realtime subscription
    const channel = supabase
      .channel(`${collectionName}_${gameId}`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: collectionName,
          filter: `id=eq.${gameId}`
        },
        async () => {
          await fetchGame();
        }
      )
      .subscribe();

    // Return unsubscribe function
    return () => {
      supabase.removeChannel(channel);
    };
  } catch (error) {
    console.error("Error al obtener el juego:", error);
    callback({
      success: false,
      message: "Error al obtener el juego",
      error: error.message,
    });
  }
};

// Obtener un juego por su código público (game_id)
export const getDocWhereGameCode = (collectionName, gameCode, callback) => {
  try {
    // Initial fetch
    const fetchGame = async () => {
      const { data, error } = await supabase
        .from(collectionName)
        .select('*')
        .eq('game_id', gameCode)
        .single();

      if (error) {
        callback({ success: false, message: 'No se encontró ningún juego con ese código.' });
      } else {
        callback({ success: true, data: data });
      }
    };

    fetchGame();

    // Realtime subscription
    const channel = supabase
      .channel(`${collectionName}_code_${gameCode}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: collectionName, filter: `game_id=eq.${gameCode}` },
        async () => {
          await fetchGame();
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  } catch (error) {
    console.error('Error al obtener el juego por código:', error);
    callback({ success: false, message: 'Error al obtener el juego por código', error: error.message });
  }
};

// Función para buscar un juego por su gameId
const findGameByGameId = async (gameId) => {
  // Try querying by snake_case field first (game_id), then fallback to camelCase (gameId)
  const { data: dataBySnake, error: errSnake } = await supabase
    .from('games')
    .select('*')
    .eq('game_id', gameId)
    .single();

  if (!errSnake && dataBySnake) return dataBySnake;

  const { data: dataByCamel, error: errCamel } = await supabase
    .from('games')
    .select('*')
    .eq('gameId', gameId)
    .single();

  if (!errCamel && dataByCamel) return dataByCamel;

  return null;
};

export const addParticipantToGame = async (gameId, userId, fname) => {
  try {
    const gameDocument = await findGameByGameId(gameId);

    if (gameDocument) {
      // Obtenemos la lista actual de participantes
      const currentParticipants = gameDocument.players || [];

      // Verificamos si el usuario ya está en la lista
      const userExists = currentParticipants.some(
        (player) => player.id === userId
      );

      if (!userExists) {
        // Si no está, lo agregamos
        currentParticipants.push({
          id: userId,
          userName: fname,
          playing: true,
        });

        const { error } = await supabase
          .from('games')
          .update({ players: currentParticipants })
          .eq('id', gameDocument.id);

        if (error) throw error;

        await updateUserGames(gameDocument.id, userId);

        return {
          success: true,
          message: `Ahora estas en el juego ${gameId}`,
        };
      } else {
        return {
          success: false,
          message: `Ya estás participando en este juego.`,
        };
      }
    } else {
      console.log(`El juego con ID ${gameId} no existe.`);
      return {
        success: false,
        message: `El juego con ID ${gameId} no existe :(`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `El juego con el ID: ${gameId} no existe`,
      error: error.message,
    };
  }
};

export const updateGameById = async (collectionName, gameId, updatedFields) => {
  try {
    const { error } = await supabase
      .from(collectionName)
      .update(updatedFields)
      .eq('id', gameId);

    if (error) throw error;

    return {
      success: true,
      message: "Juego actualizado exitosamente.",
    };
  } catch (error) {
    console.error("Error al actualizar el juego:", error);
    return {
      success: false,
      message: "Error al actualizar el juego",
      error: error.message,
    };
  }
};

export const deleteGameWithUserUpdates = async (userId, gameId) => {
  try {
    // Buscar todos los usuarios que contienen el gameId
    const { data: userDocs, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .contains('games', [gameId]);

    if (fetchError) throw fetchError;

    // Actualizar cada documento de usuario encontrado
    const updatePromises = userDocs.map(async (userDoc) => {
      const updatedUserGames = userDoc.games.filter((id) => id !== gameId);

      const { error } = await supabase
        .from('users')
        .update({ games: updatedUserGames })
        .eq('id', userDoc.id);

      if (error) throw error;
      return { userId: userDoc.id, success: true };
    });

    // Esperar a que todas las actualizaciones se completen
    await Promise.all(updatePromises);

    // Eliminar el juego
    const { error: deleteError } = await supabase
      .from('games')
      .delete()
      .eq('id', gameId);

    if (deleteError) throw deleteError;

    return {
      success: true,
      message: "Juego eliminado y usuarios actualizados correctamente.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar el juego y actualizar usuarios.",
      error: error.message,
    };
  }
};

export const getUser = async (id, collectionName) => {
  const { data, error } = await supabase
    .from(collectionName)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  
  // Return in a format similar to Firebase's getDoc
  return {
    data: () => data,
    exists: () => !!data,
  };
};

export const saveGameData = async (collectionName, documentId, data, user) => {
  try {
    if (collectionName && data && user) {
      if (documentId) {
        // Check if document exists
        const { data: existingDoc } = await supabase
          .from(collectionName)
          .select('*')
          .eq('id', documentId)
          .single();

        if (existingDoc) {
          // Update existing document
          const updatedData = {
            ...data,
            updated_at: new Date().toISOString(),
            updated_by: user,
          };

          const { error } = await supabase
            .from(collectionName)
            .update(updatedData)
            .eq('id', documentId);

          if (error) throw error;

          return {
            success: true,
            message: `Documento ${documentId} actualizado con éxito.`,
          };
        }
      }

      // Create new document
      const newData = {
        ...data,
        created_at: new Date().toISOString(),
        created_by: user,
      };

      const { data: newDoc, error } = await supabase
        .from(collectionName)
        .insert([newData])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        message: `Nuevo documento creado con ID ${newDoc.id}.`,
        gameId: newDoc.id,
      };
    } else {
      return {
        success: false,
        error: `no podemos crear un registro sin los datos necesarios`,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `Error al guardar datos: ${error.message}`,
    };
  }
};

export const updateUserGames = async (gameId, userId) => {
  try {
    const { data: userDoc, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;

    if (userDoc) {
      const gamesArray = userDoc.games || [];

      if (!gamesArray.includes(gameId)) {
        // Add the new game ID to the games array
        const updatedGames = [...gamesArray, gameId];

        const { error } = await supabase
          .from('users')
          .update({ games: updatedGames })
          .eq('id', userId);

        if (error) throw error;

        return {
          success: true,
          message: "Juego agregado exitosamente al usuario.",
        };
      } else {
        return {
          success: false,
          message: "El juego ya está asociado al usuario.",
        };
      }
    } else {
      return {
        success: false,
        message: "El usuario no existe.",
      };
    }
  } catch (error) {
    console.error("Error al actualizar el juego del usuario:", error);
    return {
      success: false,
      message: "Error al actualizar el juego del usuario:",
      error,
    };
  }
};

export const getUserNamesFromPlayerIds = async (playerIds) => {
  try {
    console.log(playerIds);
    const { data: users, error } = await supabase
      .from('users')
      .select('fname')
      .in('userId', playerIds);

    if (error) throw error;

    const userNames = users.map((user) => 
      user.fname || "Nombre de usuario no disponible"
    );

    return {
      success: true,
      message: "Nombres de usuarios obtenidos exitosamente.",
      userNames,
    };
  } catch (error) {
    console.error("Error al obtener nombres de usuarios:", error);
    return {
      success: false,
      message: "Error al obtener nombres de usuarios",
      error: error.message,
      userNames: [],
    };
  }
};

export const removeParticipantFromGame = async (gameId, userId) => {
  try {
    const { data: gameDocument, error: gameError } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .single();

    if (gameError) throw gameError;

    if (gameDocument) {
      const { data: userDoc, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      if (userDoc) {
        const userData = userDoc;

        if (userData.games && userData.games.includes(gameId)) {
          const updatedGames = userData.games.filter((game) => game !== gameId);

          const { error: updateUserError } = await supabase
            .from('users')
            .update({ games: updatedGames })
            .eq('id', userId);

          if (updateUserError) throw updateUserError;

          // Remove participant from game
          const currentParticipants = gameDocument.players || [];
          const updatedParticipants = currentParticipants.filter(
            (player) => player.id !== userId
          );

          const { error: updateGameError } = await supabase
            .from('games')
            .update({ players: updatedParticipants })
            .eq('id', gameId);

          if (updateGameError) throw updateGameError;

          return {
            success: true,
            message: `Usuario ${userId} actualizado y removido del juego ${gameId}`,
          };
        }
      } else {
        return {
          success: false,
          message: "No se encontró al usuario con el ID proporcionado.",
        };
      }
    } else {
      console.log(`El juego con ID ${gameId} no existe`);
      return {
        success: false,
        message: `El juego con ID ${gameId} no existe`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Error al remover usuario ${userId} del juego ${gameId} con el error ${error.message}`,
      error: error.message,
    };
  }
};

// Wishlist Operations

export const getWishlist = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("wishlists")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return { success: false, message: error.message };
  }
};

export const addToWishlist = async (userId, item) => {
  try {
    const { data, error } = await supabase
      .from("wishlists")
      .insert([
        {
          user_id: userId,
          item_name: item.itemName,
          item_link: item.itemLink,
          item_price: item.itemPrice,
          item_note: item.itemNote,
        },
      ])
      .select();

    if (error) throw error;
    return { success: true, data, message: "Deseo agregado correctamente" };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { success: false, message: error.message };
  }
};

export const updateWishlistItem = async (itemId, updates) => {
  try {
    const { data, error } = await supabase
      .from("wishlists")
      .update({
        item_name: updates.itemName,
        item_link: updates.itemLink,
        item_price: updates.itemPrice,
        item_note: updates.itemNote,
      })
      .eq("id", itemId)
      .select();

    if (error) throw error;
    return { success: true, data, message: "Deseo actualizado correctamente" };
  } catch (error) {
    console.error("Error updating wishlist item:", error);
    return { success: false, message: error.message };
  }
};

export const deleteWishlistItem = async (itemId) => {
  try {
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("id", itemId);

    if (error) throw error;
    return { success: true, message: "Deseo eliminado correctamente" };
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    return { success: false, message: error.message };
  }
};
