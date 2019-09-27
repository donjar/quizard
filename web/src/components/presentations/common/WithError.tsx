import React from 'react';
import styled from 'styled-components';

const withError = (Comp: any) => {
  const CompWithError: React.FC<any> = ({ error, ...props }) => {
    const ErrorParagraph = styled.p`
      color: var(--red);
    `;

    return (
      <>
        <Comp {...props} />
        {error && <ErrorParagraph>{error}</ErrorParagraph>}
      </>
    );
  };

  return CompWithError;
};

export default withError;
