import React from "react";
import AVESelectInput from "../MultiSelectInput/AVESelectInput";
import useAVECreateTemplate from "../../hooks/AVECreateTemplate/useAVECreateTemplate";
import InputField from "../common/InputField";
import { Button, TextField } from "@mui/material";
import AVEShowAllTemplates from "./AVEShowAllTemplates";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AVECreateTemplate = () => {
  const {
    onChangeOfChannels,
    selectedChannels,
    channels,
    theme,
    onAddTemplate,
    addTemplateValues,
    newTemplateInProgress,
    handleInputChangeTemplate,
    onCreateTemplate,
    onChangeOfUpdateChannels,
    inputValue,
    allTemplates,
    activeTemplate,
    isEditTemplate,
    handleChangeAddNewTemp,
    isAddNewTemplate,
  } = useAVECreateTemplate();

  return (
    <>
      <div className="ave-create-template-showAllTemplates">
        <AVEShowAllTemplates
          onChangeOfUpdateChannels={onChangeOfUpdateChannels}
          inputValue={inputValue}
          allTemplates={allTemplates}
          activeTemplate={activeTemplate}
          theme={theme}
        />
        <div className="ave-create-add-new-template mb-5">
          <span>Add new Template </span>
          <AddCircleIcon
            className="cursor-pointer"
            onClick={handleChangeAddNewTemp}
          />
        </div>
      </div>

      {(isEditTemplate || isAddNewTemplate) && (
        <div>
          <AVESelectInput
            label={"Add Template For"}
            inputValue={addTemplateValues.selectedChannels}
            handleChange={onChangeOfChannels}
            list={channels}
            isMultiple={false}
            inputTheme={theme}
          />

          <InputField
            label="Template Name"
            name="templateName"
            value={addTemplateValues.templateName}
            onChange={(event) => onAddTemplate(event)}
          />

          <InputField
            label="Add template"
            placeholder="Ex : Hey <<User>>, people are reacting to your post!"
            multiline={true}
            rows={4}
            onChange={(event) => onAddTemplate(event)}
            name="templateBody"
            value={addTemplateValues.templateBody}
          />

          {newTemplateInProgress?.placeholders &&
            Object.keys(newTemplateInProgress?.placeholders)?.map((data) => {
              return (
                <InputField
                  label={`default value for ${data}`}
                  name={data}
                  value={newTemplateInProgress?.placeholders?.[data]?.default}
                  onChange={(event) => handleInputChangeTemplate(event)}
                />
              );
            })}

          <div className="ave-send-notification-submit">
            <Button
              variant="contained"
              type="button"
              className="av-notify-placeholder-submit bg-ave-primary"
              onClick={onCreateTemplate}
            >
              {isEditTemplate ? "Update Template" : "Create Template"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AVECreateTemplate;
