import { useEffect } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Router from 'next/router';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'get',
    body: {},
    onSuccess: () => {
      Router.push('/');
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return 'Signing you out ...';
};
