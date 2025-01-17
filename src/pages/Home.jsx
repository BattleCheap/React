import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenue sur la page d'accueil</h1>
      <p>Pour accéder à votre espace personnel, veuillez vous connecter....</p>
      <Link to="/login">
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Se connecter
        </button>
      </Link>
    </div>
  );
}

export default Home;
