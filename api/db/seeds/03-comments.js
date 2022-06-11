/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').del()
  await knex('comments').insert([
    {
      id: 15, 
      user_id: 149,
      post_id: 51,
      body: 'Node is awesome', 
      created_at: '2021-09-01', 
      updated_at: '2021-09-01'
    }
  ]);
};