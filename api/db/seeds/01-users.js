/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 10101, 
      username: 'testuser3', 
      email: 'test@test3.com', 
      password: 'password1', 
      confirm_password: 'password1',
      role: 'reader',
      image_path: '/resources/static/assets/uploads/9cebe2fa3429036f272f21f3146762df',
      created_at: '2021-09-01', 
      updated_at: '2021-09-01'
    }
  ]);
};
