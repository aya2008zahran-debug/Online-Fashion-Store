import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hmcqevvwvisxvncmmneb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtY3FldnZ3dmlzeHZuY21tbmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NzA0OTIsImV4cCI6MjA5MDU0NjQ5Mn0.mt6q8UAFoQ5EBRLrkeJ_XXFyftCxOJQjbCv87UzDxvA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
