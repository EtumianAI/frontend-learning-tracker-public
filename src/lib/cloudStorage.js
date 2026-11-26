const TABLE = 'tracker_data';

export function normalizeTrackerState(value) {
  if (!value || !Array.isArray(value.items)) {
    throw new Error('В облаке не найден корректный формат данных трекера.');
  }

  return {
    items: value.items,
    errors: Array.isArray(value.errors) ? value.errors : [],
    answer: typeof value.answer === 'string' ? value.answer : '',
    seen: Array.isArray(value.seen) ? value.seen : [],
    questions: Array.isArray(value.questions) ? value.questions : [],
  };
}

export async function loadCloudState(client, userId) {
  const { data, error } = await client
    .from(TABLE)
    .select('data')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data ? normalizeTrackerState(data.data) : null;
}

export async function saveCloudState(client, userId, state) {
  const { error } = await client
    .from(TABLE)
    .upsert({
      user_id: userId,
      data: state,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

  if (error) throw error;
}
