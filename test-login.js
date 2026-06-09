import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  console.log("Testing with !wjdduddnr123");
  const { data: d1, error: e1 } = await supabase.auth.signInWithPassword({
    email: '20000177@dbglobalchip.local',
    password: '!wjdduddnr123'
  });
  console.log("Result 1:", e1 ? e1.message : "Success! User ID: " + d1.user.id);
  
  if (d1 && d1.user) {
    console.log("Updating profile...");
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ full_name: '정영욱', department: '피플팀' })
      .eq('id', d1.user.id);
      
    if (updateError) {
      console.error("Failed to update profile:", updateError.message);
    } else {
      console.log("Profile updated successfully to '정영욱', '피플팀'");
    }
  }
}

test();
