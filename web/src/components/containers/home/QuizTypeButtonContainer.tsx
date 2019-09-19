import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IToggleButtonProps } from '../../../interfaces/common';
import { ToggledDarkButton } from '../../presentations/common/buttons/ToggledDarkButton';
import { toggleQuizType } from './redux/actions';

interface IQuizTypeButtonProps extends IToggleButtonProps {
  quizTypeSelected: string;
}

const QuizTypeButtonContainer: React.FC<IQuizTypeButtonProps> = ({
  onClick,
  isSelected,
  children
}) => {
  return (
    <ToggledDarkButton onClick={onClick} isSelected={isSelected}>
      {children}
    </ToggledDarkButton>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IQuizTypeButtonProps
) => ({
  onClick: () => {
    dispatch(toggleQuizType(ownProps.quizTypeSelected));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(QuizTypeButtonContainer);
