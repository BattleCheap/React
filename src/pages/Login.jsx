import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const navigate = useNavigate(); // Créer une instance de navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Si la réponse n'est pas "200 OK", on lève une erreur
        const errorData = await response.json();
        throw new Error(errorData.detail || "Une erreur s'est produite");
      }

      const data = await response.json();
      console.log("Réponse de l'API :", data);

      // Redirection après succès
      if (data.status === "success" || data.message === "Login successful") {
        navigate("/personal");
      }
    } catch (err) {
      setError(err.message); // Affichez l'erreur à l'utilisateur
    }
  };

  const handleBack = () => {
    navigate(-1); // Retourner à la page précédente
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Connexion</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}
      >
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            {error}
          </p>
        )}
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Email :
          </label>
          <input
            type="email"
            id="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={handleBack}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            Retour
          </button>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
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
