/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
      id: 200, 
      post_title: 'Node is awesome', 
      post_body: 'This an awesome and very portable server.',
      user_id: 300,
      created_at: '2021-09-01', 
      updated_at: '2021-09-01'
    }
  ]);
};