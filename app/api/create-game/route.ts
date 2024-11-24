// pages/api/create-game.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  const { movieId, movieTitle, questions } = body;
  console.log(req.body);
  // if (!movieId || !movieTitle || !questions) {
  //   res.status(400).json({ error: "Missing required fields" });
  //   return;
  // }
  return NextResponse.json({
    message: "Game and questions saved successfully!",
  });

  //   try {
  //     // Start a transaction
  //     const client = await pool.connect();
  //     try {
  //       await client.query('BEGIN');

  //       // Insert into the game table
  //       const gameResult = await client.query(
  //         'INSERT INTO game (movie_id, movie_title) VALUES ($1, $2) RETURNING id',
  //         [movieId, movieTitle]
  //       );
  //       const gameId = gameResult.rows[0].id;

  //       // Prepare the insert query for questions
  //       const insertQuestionText = `
  //         INSERT INTO question (
  //           game_id,
  //           question_text,
  //           options,
  //           correct_answer,
  //           difficulty,
  //           category
  //         ) VALUES ($1, $2, $3, $4, $5, $6)
  //       `;

  //       // Insert each question
  //       for (const question of questions) {
  //         await client.query(insertQuestionText, [
  //           gameId,
  //           question.question,
  //           JSON.stringify(question.options),
  //           question.answer,
  //           question.difficulty,
  //           question.category,
  //         ]);
  //       }

  //       await client.query('COMMIT');
  //       res.status(200).json({ gameId });
  //     } catch (error) {
  //       await client.query('ROLLBACK');
  //       console.error('Transaction Error:', error);
  //       res.status(500).json({ error: 'Database transaction failed' });
  //     } finally {
  //       client.release();
  //     }
}
