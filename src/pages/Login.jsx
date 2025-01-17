import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Créer une instance de navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion (validation simple ici, à remplacer par une API réelle)
    if ((email === 'test@example.com' && password === 'password') || true) {
      // alert('Connexion réussie !');
      navigate('/personal'); // Rediriger vers la page personnelle
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Retourner à la page précédente
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email :</label>
          <input
            type="email"
            id="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Mot de passe :</label>
          <input
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleBack}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            Retour
          </button>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
