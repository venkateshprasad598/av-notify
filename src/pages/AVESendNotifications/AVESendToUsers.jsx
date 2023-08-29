import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import {
  Wizard,
  WizardStep,
} from "../../components/MutltiStepForm/MultiStepForm";
import InputField from "../../components/common/InputField";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const users = [
  "b40e8100-86c0-4efa-b60b-c8fc42752b23",
  "9c920493-e658-45ad-aaf6-b914dc9cbebe",
  "86ef9505-3ee3-4995-81d9-48decb43307e",
  "61a036ed-612c-415e-8ffc-20275d0edcf5",
];

const channels = ["Push", "SMS", "Email"];
const apps = ["WM2.0"];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

const validationSchemaEmail = yup.object({
  email: yup.string().required("Email is required"),
});

const AVESendToUsers = () => {
  const theme = useTheme();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [channelName, setChannelName] = useState([]);
  const [appName, selectAppName] = useState([]);
  const [pushTemplate, setPushTemplate] = useState();
  const [selectedPushTemplateName, setSelectedPushTemplateName] = useState([]);

  const [smsTemplate, setSMSTemplate] = useState([]);
  const [selectedSMSTemplateName, setSelectedSMSTemplateName] = useState([]);

  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedEmailTemplateName, setSelectedEmailTemplateName] = useState(
    []
  );

  const [pushNotificationIndex, setPushNotificationIndex] = useState(null);
  const [smsNotificationIndex, setSmsNotificationIndex] = useState(null);
  const [emailNotificationIndex, setEmailNotificationIndex] = useState(null);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeChannel = (event) => {
    const {
      target: { value },
    } = event;
    setChannelName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeApp = (event) => {
    const {
      target: { value },
    } = event;
    selectAppName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeTemplate = (event, data, type) => {
    const {
      target: { value },
    } = event;
    const index = data?.props?.id;

    if (type == "push") {
      setPushNotificationIndex(index);
      setSelectedPushTemplateName(value);
    } else if (type == "sms") {
      setSmsNotificationIndex(index);
      setSelectedSMSTemplateName(value);
    } else if (type == "email") {
      setEmailNotificationIndex(index);
      setSelectedEmailTemplateName(value);
    }
  };

  const handleInputChangeTemplate = (event, type) => {
    const { value, name } = event.target;
    if (type == "push") {
      const templates = [...pushTemplate];
      const prevTemplate = templates[pushNotificationIndex];
      prevTemplate["placeholders"][name]["default"] = value;
      setPushTemplate(templates);
    } else if (type == "sms") {
      const templates = [...smsTemplate];
      const prevTemplate = templates[smsNotificationIndex];
      prevTemplate["placeholders"][name]["default"] = value;
      setSMSTemplate(templates);
    } else if (type == "email") {
      const templates = [...emailTemplate];
      const prevTemplate = templates[emailNotificationIndex];
      prevTemplate["placeholders"][name]["default"] = value;
      setEmailTemplate(templates);
    }
  };

  const handleFormSubmit = (values) => {
    console.log({ values });
  };

  const makeTemplateDynamic = (template) => {
    const message = template?.body;

    const replacementMapping = {};
    Object.keys(template?.placeholders)?.map((data) => {
      console.log({ hey: data });
      replacementMapping[data] = template?.placeholders?.[data]?.["default"];
    });

    console.log({ template, replacementMapping });

    const newMessage = message.replace(/<<([^>]+)>>/g, (match, placeholder) => {
      return replacementMapping[placeholder] || match;
    });
    console.log({ newMessage });
    return "Message  : " + newMessage;
  };

  const getTemplate = async () => {
    const apiCallList = channelName?.map((data) => {
      return axios.get(
        `https://cloud-api.adroit-vantage.com/dev/aim/notification?requestType=get-all-templates&channelId=${data?.toLowerCase()}`
      );
    });

    try {
      const templateRes = await Promise.all(apiCallList);
      const pushTemplateRes = templateRes[0]?.data?.templates
        ? templateRes[0]?.data?.templates
        : [];

      const encodedPushTemplates = pushTemplateRes?.length
        ? pushTemplateRes?.map((data) => {
            if (data?.body) {
              const obj = { ...data };
              obj["body"] = atob(data?.body);
              obj["template"] = atob(data?.body);
              return obj;
            }
            return data;
          })
        : [];

      const smsTemplateRes = templateRes[1]?.data?.templates
        ? templateRes[1]?.data?.templates
        : [];

      const encodedSMSTemplates = smsTemplateRes?.length
        ? smsTemplateRes?.map((data) => {
            if (data?.body) {
              const obj = { ...data };
              obj["body"] = atob(data?.body);
              obj["template"] = atob(data?.body);
              return obj;
            }
            return data;
          })
        : [];

      const emailTemplateRes = templateRes[2]?.data?.templates
        ? templateRes[1]?.data?.templates
        : [];

      const encodedEmailTemplates = emailTemplateRes?.length
        ? emailTemplateRes?.map((data) => {
            if (data?.body) {
              const obj = { ...data };
              obj["body"] = atob(data?.body);
              obj["template"] = atob(data?.body);
              return obj;
            }
            return data;
          })
        : [];

      encodedPushTemplates?.length && setPushTemplate(encodedPushTemplates);
      encodedSMSTemplates?.length && setSMSTemplate(encodedSMSTemplates);
      encodedEmailTemplates?.length && setEmailTemplate(encodedEmailTemplates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (channelName?.length) {
      getTemplate();
    }
  }, [channelName]);

  const onSendNotification = () => {
    const allTemplates = {
      Push: {
        name: "push",
        index: pushNotificationIndex,
        template: pushTemplate[pushNotificationIndex],
      },
      SMS: {
        name: "sms",
        index: smsNotificationIndex,
        template: smsTemplate[smsNotificationIndex],
      },
      Email: {
        name: "email",
        index: emailNotificationIndex,
        template: emailTemplate[emailNotificationIndex],
      },
    };
    const payloadObj = {
      requestType: "send-bulk-notification-via-user-list",
      userList: selectedUsers,
      userDataSourceType: "manual",
      notificationType: "promotional",
      channels: [],
    };

    channelName?.map((channelItem) => {
      console.log({ channelItem });
      const channelObj = {
        channel: "push",
        title: "<Title>",
        appName: "wm2.0",
        section: "general",
        placeholders: [],
        template: "general:v1",
      };
      if (
        allTemplates?.[channelItem]?.["index"] !== 0 &&
        !allTemplates?.[channelItem]?.["index"] !== 0
      )
        return;

      channelObj["channel"] = allTemplates?.[channelItem]?.["name"];
      channelObj["appName"] = appName[0] ? appName[0] : "wm2.0";
      const currentTemplate = allTemplates[channelItem]["template"];

      console.log({ currentTemplate, allTemplates });
      const placeholdersArr = [];
      Object.keys(currentTemplate?.["placeholders"])?.map((data) => {
        placeholdersArr.push({
          ph: data,
          value: currentTemplate?.placeholders?.[data]?.default,
        });
      });
      channelObj["placeholders"] = placeholdersArr;
      payloadObj.channels?.push(channelObj);
    });

    axios.post(
      "https://cloud-api.adroit-vantage.com/dev/aim/notification",
      payloadObj
    );

    console.log({ payloadObj });
  };

  return (
    <div className="av-notify-dashboard">
      {" "}
      <div className="av-notify-mulltistep">
        <Wizard
          initialValues={{ name: "", email: "" }}
          onSubmit={(values, { setSubmitting }) => {
            handleFormSubmit(values);
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <WizardStep
            stepName="Person"
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit(values);
              alert(JSON.stringify(values, null, 2));
            }}
            validationSchema={validationSchema}
          >
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-multiple-name-label">
                Select User List
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectedUsers}
                onChange={handleChange}
                input={<OutlinedInput label="Select User List" />}
                MenuProps={MenuProps}
              >
                {users.map((data) => (
                  <MenuItem
                    key={data}
                    value={data}
                    style={getStyles(data, selectedUsers, theme)}
                  >
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-multiple-name-label">
                Select Channels
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={channelName}
                onChange={handleChangeChannel}
                input={<OutlinedInput label="Select Channels" />}
                MenuProps={MenuProps}
              >
                {channels.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, channelName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-multiple-name-label">
                Select App Name
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={appName}
                onChange={handleChangeApp}
                input={<OutlinedInput label="Select App Name" />}
                MenuProps={MenuProps}
              >
                {apps.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, appName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {channelName?.includes("Push") && (
              <div className="av-notify-placeholder">
                <InputLabel
                  id="demo-multiple-name-label"
                  style={{ fontWeight: "600", margin: "1rem 1rem 0.5rem 1rem" }}
                >
                  For Push Notification :
                </InputLabel>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="demo-multiple-name-label">
                    Select Template
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selectedPushTemplateName}
                    onChange={(event, index) =>
                      handleChangeTemplate(event, index, "push")
                    }
                    input={<OutlinedInput label="Select Template" />}
                    MenuProps={MenuProps}
                  >
                    {pushTemplate?.map((data, index) => (
                      <MenuItem
                        key={index}
                        id={index}
                        value={data?.body}
                        style={getStyles(
                          data?.body,
                          selectedPushTemplateName,
                          theme
                        )}
                      >
                        {data?.body}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div>
                  {pushNotificationIndex || pushNotificationIndex == 0
                    ? Object.keys(
                        pushTemplate[pushNotificationIndex]?.placeholders
                      )?.map((data) => {
                        return (
                          <div className="av-notify-textField">
                            <TextField
                              fullWidth
                              label={data}
                              name={data}
                              value={
                                pushTemplate[pushNotificationIndex]
                                  ?.placeholders?.[data]?.default
                              }
                              onChange={(event) =>
                                handleInputChangeTemplate(event, "push")
                              }
                            />
                          </div>
                        );
                      })
                    : null}
                </div>
                <div className="av-notify-dynamic-template">
                  {pushNotificationIndex || pushNotificationIndex == 0
                    ? makeTemplateDynamic(pushTemplate[pushNotificationIndex])
                    : null}
                </div>
              </div>
            )}

            {channelName?.includes("SMS") && (
              <div className="av-notify-placeholder">
                <InputLabel
                  id="demo-multiple-name-label"
                  style={{ fontWeight: "600", margin: "1rem 1rem 0.5rem 1rem" }}
                >
                  For SMS Notification :
                </InputLabel>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="demo-multiple-name-label">
                    Select Template
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selectedSMSTemplateName}
                    onChange={(event, index) =>
                      handleChangeTemplate(event, index, "sms")
                    }
                    input={<OutlinedInput label="Select Template" />}
                    MenuProps={MenuProps}
                  >
                    {smsTemplate?.map((data, index) => (
                      <MenuItem
                        key={index}
                        id={index}
                        value={data?.body}
                        style={getStyles(
                          data?.body,
                          selectedSMSTemplateName,
                          theme
                        )}
                      >
                        {data?.body}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div>
                  {smsNotificationIndex || smsNotificationIndex == 0
                    ? Object.keys(
                        smsTemplate[smsNotificationIndex]?.placeholders
                      )?.map((data) => {
                        return (
                          <div className="av-notify-textField">
                            <TextField
                              fullWidth
                              label={data}
                              name={data}
                              value={
                                smsTemplate[smsNotificationIndex]
                                  ?.placeholders?.[data]?.default
                              }
                              onChange={(event) =>
                                handleInputChangeTemplate(event, "sms")
                              }
                            />
                          </div>
                        );
                      })
                    : null}
                </div>
                <div className="av-notify-dynamic-template">
                  {smsNotificationIndex || smsNotificationIndex == 0
                    ? makeTemplateDynamic(smsTemplate[smsNotificationIndex])
                    : null}
                </div>
              </div>
            )}

            {channelName?.includes("Email") && (
              <div className="av-notify-placeholder">
                <InputLabel
                  id="demo-multiple-name-label"
                  style={{ fontWeight: "600", margin: "1rem 1rem 0.5rem 1rem" }}
                >
                  For Email Notification :
                </InputLabel>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="demo-multiple-name-label">
                    Select Template
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selectedEmailTemplateName}
                    onChange={(event, index) =>
                      handleChangeTemplate(event, index, "email")
                    }
                    input={<OutlinedInput label="Select Template" />}
                    MenuProps={MenuProps}
                  >
                    {emailTemplate?.map((data, index) => (
                      <MenuItem
                        key={index}
                        id={index}
                        value={data?.body}
                        style={getStyles(
                          data?.body,
                          selectedEmailTemplateName,
                          theme
                        )}
                      >
                        {data?.body}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div>
                  {emailNotificationIndex || emailNotificationIndex == 0
                    ? Object.keys(
                        emailTemplate[emailNotificationIndex]?.placeholders
                      )?.map((data) => {
                        return (
                          <div className="av-notify-textField">
                            <TextField
                              fullWidth
                              label={data}
                              name={data}
                              value={
                                emailTemplate[emailNotificationIndex]
                                  ?.placeholders?.[data]?.default
                              }
                              onChange={(event) =>
                                handleInputChangeTemplate(event, "email")
                              }
                            />
                          </div>
                        );
                      })
                    : null}
                </div>
                <div className="av-notify-dynamic-template">
                  {emailNotificationIndex || emailNotificationIndex == 0
                    ? makeTemplateDynamic(emailTemplate[emailNotificationIndex])
                    : null}
                </div>
              </div>
            )}

            <div className="ave-send-notification-submit">
              <Button
                variant="contained"
                type="button"
                className="av-notify-placeholder-submit"
                onClick={onSendNotification}
              >
                Submit
              </Button>
            </div>
            {/* pushTemplate */}
          </WizardStep>
          <WizardStep
            stepName="Email"
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit(values);
              alert(JSON.stringify(values, null, 2));
            }}
            validationSchema={validationSchemaEmail}
          >
            <InputField name="email" label="Email" />
          </WizardStep>
        </Wizard>
      </div>
    </div>
  );
};

export default AVESendToUsers;
