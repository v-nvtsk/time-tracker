import{useState} from 'react';

interface AuthProps {
  onLogin: (username:string, password:string) => void;
  error?: string;
}

export const Auth: React.FC<AuthProps> = ({
  onLogin, error = ''
}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin (username, password);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form
        onSubmit={handleLogin} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <input
          type="text"
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );

};
