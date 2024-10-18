import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 
  async listLivros() {
    const livros = await sql`select * from livros`;
    return livros;
  }

  async createLivro(livro) {
    const id = randomUUID();
    console.log('id', id);
    const nome = livro.nome;
    const autor = livro.autor;
    const editora = livro.editora;
    
    await sql`insert into livros (id, nome, autor, editora)
    values (${id}, ${nome}, ${autor}, ${editora})`
  }

  async updateLivro(id, livro) {
    const nome = livro.nome;
    const autor = livro.autor;
    const editora = livro.editora;

    await sql`update livros set 
        nome = ${nome},
        autor = ${autor},
        editora = ${editora}
        where id = ${id}
    `;
  }

  async deleteLivro(id) {
    await sql`delete from livros where id = ${id}`
  }

}