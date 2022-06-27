import React from "react";
import { Link, Params, useLocation, useParams } from "react-router-dom"

const KNOWN_ERRORS: { [name: string]: React.ReactElement } = {
  'localStorage': (
    <div>
      <h2>localStorage denied</h2>
      <p>please enable the localStorage</p>
    </div>
  )
}

export default function ErrorPage() {
  const { name } = useParams();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const message = params.get('message');

  const knownError = KNOWN_ERRORS[name] || null;

  return (
    <div className='error-page'>
      <h1>Error!</h1>
      {message ? <span className='error-page__message'>{message}</span> : null}
      <span className='error-page__known-error'>
        {knownError ? knownError : name ? name : null}
      </span>
      <Link to={'/'}>[Home]</Link>
    </div>
  );
}