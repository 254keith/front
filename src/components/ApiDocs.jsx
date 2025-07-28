import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchApiDocs } from '../api';

const Container = styled.div`
  padding: 4rem 2rem;
  background: linear-gradient(45deg, var(--bg-primary, #0a1220), var(--bg-secondary, #1a2233));
  color: var(--text-primary, #fff);
  min-height: 100vh;
  margin-left: 5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--accent, #3b82f6);
`;

const EndpointList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EndpointItem = styled.li`
  margin-bottom: 1.5rem;
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
  padding: 1rem 1.5rem;
  border: 1px solid rgba(255,255,255,0.1);
`;

const Method = styled.span`
  font-weight: bold;
  color: #06b6d4;
  margin-right: 1rem;
`;

const Path = styled.span`
  font-family: monospace;
  color: #fff;
`;

const Desc = styled.span`
  color: #a0aec0;
  margin-left: 1rem;
`;

const ApiDocs = () => {
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchApiDocs()
      .then(data => {
        setDocs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Title>API Documentation</Title>
      {loading && <div>Loading API docs...</div>}
      {error && <div style={{ color: '#ff4757' }}>{error}</div>}
      {docs && Array.isArray(docs.endpoints) && (
        <EndpointList>
          {docs.endpoints.map((ep, i) => (
            <EndpointItem key={i}>
              <Method>{ep.method}</Method>
              <Path>{ep.path}</Path>
              <Desc>{ep.description}</Desc>
            </EndpointItem>
          ))}
        </EndpointList>
      )}
      {docs && !Array.isArray(docs.endpoints) && (
        <pre style={{ background: '#222', color: '#fff', padding: 16, borderRadius: 8, overflowX: 'auto' }}>{JSON.stringify(docs, null, 2)}</pre>
      )}
    </Container>
  );
};

export default ApiDocs; 