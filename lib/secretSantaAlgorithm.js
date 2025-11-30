/**
 * Secret Santa Matching Algorithm
 * 
 * Genera emparejamientos válidos para el juego de Amigo Secreto
 * garantizando que:
 * - Nadie se regala a sí mismo
 * - Todos dan y reciben exactamente un regalo
 * - Se respetan las restricciones definidas
 * - Funciona con cualquier número de participantes ≥ 3
 */

/**
 * Genera pares de Secret Santa
 * @param {Array} participants - Array de objetos {id, name, email}
 * @param {Object} options - Opciones de configuración
 * @param {Array} options.restrictions - Array de restricciones [{giverId, receiverId}]
 * @param {Array} options.previousPairs - Pares de años anteriores para evitar repetición
 * @param {number} options.maxAttempts - Número máximo de intentos (default: 100)
 * @returns {Array} Array de pares [{giver, receiver}]
 */
export function generateSecretSantaPairs(participants, options = {}) {
  const {
    restrictions = [],
    previousPairs = [],
    maxAttempts = 100
  } = options;

  // Validación básica
  if (!participants || participants.length < 3) {
    throw new Error('Se requieren al menos 3 participantes para el juego');
  }

  // Validar que no haya IDs duplicados
  const ids = participants.map(p => p.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error('No puede haber participantes duplicados');
  }

  let attempts = 0;
  let validPairs = null;

  while (attempts < maxAttempts && !validPairs) {
    attempts++;
    const pairs = attemptGeneration(participants, restrictions, previousPairs);
    
    if (pairs && validatePairs(pairs, participants, restrictions, previousPairs)) {
      validPairs = pairs;
    }
  }

  if (!validPairs) {
    throw new Error(
      `No se pudo generar un emparejamiento válido después de ${maxAttempts} intentos. ` +
      'Verifica que las restricciones no sean imposibles de cumplir.'
    );
  }

  return validPairs;
}

/**
 * Intenta generar un conjunto de pares usando el algoritmo de cadena circular
 */
function attemptGeneration(participants, restrictions, previousPairs) {
  // Crear una copia para no mutar el original
  const shuffled = [...participants];
  
  // Fisher-Yates shuffle para aleatorizar
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Crear cadena circular: cada persona le da a la siguiente
  const pairs = [];
  for (let i = 0; i < shuffled.length; i++) {
    const giver = shuffled[i];
    const receiver = shuffled[(i + 1) % shuffled.length];
    
    pairs.push({
      giver: {
        id: giver.id,
        name: giver.name,
        email: giver.email
      },
      receiver: {
        id: receiver.id,
        name: receiver.name,
        email: receiver.email
      }
    });
  }

  return pairs;
}

/**
 * Valida que los pares cumplan todas las reglas
 */
function validatePairs(pairs, participants, restrictions, previousPairs) {
  // Regla 1: Nadie se regala a sí mismo
  for (const pair of pairs) {
    if (pair.giver.id === pair.receiver.id) {
      return false;
    }
  }

  // Regla 2: Todos dan exactamente una vez
  const givers = new Set(pairs.map(p => p.giver.id));
  if (givers.size !== participants.length) {
    return false;
  }

  // Regla 3: Todos reciben exactamente una vez
  const receivers = new Set(pairs.map(p => p.receiver.id));
  if (receivers.size !== participants.length) {
    return false;
  }

  // Regla 4: Respetar restricciones
  for (const pair of pairs) {
    const hasRestriction = restrictions.some(
      r => r.giverId === pair.giver.id && r.receiverId === pair.receiver.id
    );
    if (hasRestriction) {
      return false;
    }
  }

  // Regla 5: Evitar repetir pares del año anterior (si aplica)
  if (previousPairs && previousPairs.length > 0) {
    for (const pair of pairs) {
      const wasLastYear = previousPairs.some(
        p => p.giverId === pair.giver.id && p.receiverId === pair.receiver.id
      );
      if (wasLastYear) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Genera un código único de seguimiento para juegos rápidos
 */
export function generateTrackingCode() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `SS-${timestamp}-${randomStr}`.toUpperCase();
}

/**
 * Prepara los datos para enviar emails
 * @param {Array} pairs - Pares generados
 * @param {Object} gameInfo - Información del juego
 * @param {boolean} isUltraSecret - Si es modo ultra secreto
 * @returns {Array} Array de objetos para enviar emails
 */
export function prepareEmailData(pairs, gameInfo, isUltraSecret = false) {
  return pairs.map(pair => ({
    to: pair.giver.email,
    giverName: pair.giver.name,
    receiverName: isUltraSecret ? null : pair.receiver.name,
    receiverId: pair.receiver.id,
    gameInfo: {
      name: gameInfo.name,
      date: gameInfo.date,
      budget: gameInfo.budget,
      description: gameInfo.description
    },
    isUltraSecret,
    trackingCode: gameInfo.trackingCode
  }));
}

/**
 * Función auxiliar para testing - genera participantes de prueba
 */
export function generateTestParticipants(count) {
  const participants = [];
  for (let i = 1; i <= count; i++) {
    participants.push({
      id: `user-${i}`,
      name: `Participante ${i}`,
      email: `participante${i}@example.com`
    });
  }
  return participants;
}

/**
 * Estadísticas del emparejamiento (útil para debugging)
 */
export function getPairingStats(pairs) {
  return {
    totalPairs: pairs.length,
    uniqueGivers: new Set(pairs.map(p => p.giver.id)).size,
    uniqueReceivers: new Set(pairs.map(p => p.receiver.id)).size,
    isValid: pairs.length > 0 && 
             new Set(pairs.map(p => p.giver.id)).size === pairs.length &&
             new Set(pairs.map(p => p.receiver.id)).size === pairs.length
  };
}
