import { useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Router from 'next/router';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess() {
      Router.push('/');
    },
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email address</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
