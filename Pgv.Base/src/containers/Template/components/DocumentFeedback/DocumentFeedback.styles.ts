import styled from "pgv-lib/ui/emotion/styled"

export const Container = styled.div`
  display: flex;
  gap: 50px;

  .question-box {
    display: flex;
    gap: 12px;

    .feedback-box {
      display: flex;
      gap: 12px;

      .feedback-button {
        font-weight: 600;
        opacity: 0.8;
        cursor: pointer;
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`
