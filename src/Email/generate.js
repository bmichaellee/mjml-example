import React from "react";
import {
  Mjml,
  MjmlHead,
  MjmlTitle,
  MjmlPreview,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlImage,
  MjmlButton,
} from "mjml-react";
import { MjmlText } from "mjml-react";

export const generate = () => (
  <Mjml>
    <MjmlHead>
      <MjmlTitle>This is a title</MjmlTitle>
      <MjmlPreview>This is a preview</MjmlPreview>
    </MjmlHead>
    <MjmlBody width={500}>
      <MjmlSection fullWidth backgroundColor="#101820">
        <MjmlColumn>
          <MjmlText color="white">
            This is some text. The variable's value is '%%var%%'
          </MjmlText>
          <MjmlImage src="http://placekitten.com/450/300" />
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection>
        <MjmlColumn>
          <MjmlButton
            padding="20px"
            backgroundColor="#ED965D"
            href="http://localhost"
          >
            This is a button
          </MjmlButton>
        </MjmlColumn>
      </MjmlSection>
    </MjmlBody>
  </Mjml>
);
