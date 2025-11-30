### 3. Cambios en el Código

#### Antes (Firebase):

```javascript
import { app, auth, db, storage } from "./firebase";
```

#### Ahora (Supabase):

```javascript
import { supabase, auth, db, storage } from "./supabase";
```

### 4. Diferencias Principales en el API

#### Autenticación

**Firebase:**

```javascript
import { signInWithEmailAndPassword } from "firebase/auth";
await signInWithEmailAndPassword(auth, email, password);
```

**Supabase:**

```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

#### Base de Datos

**Firebase (Firestore):**

```javascript
import { collection, getDocs } from "firebase/firestore";
const querySnapshot = await getDocs(collection(db, "users"));
```

**Supabase:**

```javascript
const { data, error } = await supabase.from("users").select("*");
```

#### Storage

**Firebase:**

```javascript
import { ref, uploadBytes } from "firebase/storage";
const storageRef = ref(storage, "images/photo.jpg");
await uploadBytes(storageRef, file);
```

**Supabase:**

```javascript
const { data, error } = await supabase.storage
  .from("images")
  .upload("photo.jpg", file);
```

### 5. Próximos Pasos

1. ✅ Instalar dependencias (completado)
2. ⏳ **Configurar variables de entorno en `.env`** (PENDIENTE - necesitas tus credenciales)
3. ✅ Actualizar imports en todos los archivos (completado)
4. ✅ Migrar llamadas de API de Firebase a Supabase (completado)
5. ⏳ **Configurar tablas en Supabase Dashboard** (PENDIENTE)
6. ⏳ **Configurar políticas de seguridad (RLS) en Supabase** (PENDIENTE)

### 6. Estructura de Base de Datos Requerida

Necesitas crear las siguientes tablas en Supabase:

#### Tabla `users`

```sql
create table users (
  id uuid references auth.users primary key,
  fname text,
  lname text,
  games text[],
  created_at timestamp with time zone default now()
);
```

#### Tabla `games`

```sql
create table games (
  id uuid default uuid_generate_v4() primary key,
  game_name text,
  game_description text,
  date_of_game timestamp with time zone,
  game_amount integer,
  game_active boolean,
  game_id text unique,
  players jsonb,
  created_at timestamp with time zone default now(),
  created_by uuid references auth.users,
  updated_at timestamp with time zone,
  updated_by uuid references auth.users
);
```

### 7. Recursos Útiles

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Migración desde Firebase](https://supabase.com/docs/guides/migrations/firebase-auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## Notas Importantes

- El archivo `firebase.js` aún existe pero ya no se usa. Puedes eliminarlo cuando hayas completado la migración.
- Las variables de entorno de Supabase usan el prefijo `NEXT_PUBLIC_` para que estén disponibles en el cliente.
- Supabase usa PostgreSQL en lugar de Firestore, por lo que la estructura de datos puede ser diferente.
