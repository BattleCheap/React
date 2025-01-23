import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenue sur la page d'accueil</h1>
      <p>Pour accéder à votre espace personnel, veuillez vous connecter ou vous inscrire.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login">
          <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Se connecter
          </button>
        </Link>
        <Link to="/register">
          <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px' }}>
            S'inscrire
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
