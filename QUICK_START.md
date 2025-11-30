# 🚀 Inicio Rápido - Configuración de Supabase

## Paso 1: Configurar Variables de Entorno (5 minutos)

1. **Obtén tus credenciales de Supabase:**

   - Ve a https://app.supabase.com
   - Crea un nuevo proyecto o selecciona uno existente
   - Ve a `Settings` > `API`
   - Copia:
     - **Project URL**
     - **anon public key**

2. **Configura tu archivo `.env`:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=tu-clave-aqui
   ```

## Paso 2: Crear las Tablas en Supabase (3 minutos)

1. En Supabase Dashboard, ve a `SQL Editor`
2. Click en `New Query`
3. Copia y pega el contenido completo de `supabase-migration.sql`
4. Click en `Run` (o presiona Ctrl+Enter)
5. Verifica que no haya errores

## Paso 3: Habilitar Realtime (Opcional, 1 minuto)

1. En Supabase Dashboard, ve a `Database` > `Replication`
2. Habilita realtime para las tablas:
   - `users`
   - `games`

## Paso 4: Probar la Aplicación

```bash
npm run dev
```

Abre http://localhost:3000 y prueba:

- ✅ Registrar un nuevo usuario
- ✅ Iniciar sesión
- ✅ Crear un juego
- ✅ Ver el dashboard

## ✅ Checklist de Verificación

- [ ] Variables de entorno configuradas en `.env`
- [ ] Script SQL ejecutado sin errores
- [ ] Tabla `users` creada
- [ ] Tabla `games` creada
- [ ] Políticas RLS habilitadas
- [ ] Aplicación corriendo en desarrollo
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] Crear juego funciona

## 🆘 ¿Problemas?

Consulta `MIGRATION_SUMMARY.md` para solución de problemas detallada.

---

**¡Listo para usar! 🎉**
