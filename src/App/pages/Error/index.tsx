import React from "react";
import { Link, useParams } from "react-router-dom";

const description: Record<string, string> = {
  dev: 'hello world',
};

export default function ErrorPage() {
  const { name } = useParams();

  return (
    <main>
      <header>
        <h1>Error!</h1>
      </header>
      <article>
        {
          name && <h3>{name}</h3>
        }
        {
          name && description[name] && <p>{description[name]}</p>
        }
      </article>
      <nav>
        <Link to={'/'}>Home</Link>
      </nav>
    </main>
  );
}