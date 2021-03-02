# HelpScout

- [HelpScout](#helpscout)
  - [Installation](#installation)
  - [API Usage](#api-usage)
    - [Conversations](#conversations)
      - [Conversations (CRUD)](#conversations-crud)
        - [List Conversations](#list-conversations)
        - [Get Conversation](#get-conversation)
        - [Create Conversation](#create-conversation)
        - [Update Conversation](#update-conversation)
        - [Delete Conversation](#delete-conversation)
      - [Attachments](#attachments)
        - [Get Attachment Data](#get-attachment-data)
        - [Delete Attachment](#delete-attachment)
        - [Upload Attachment](#upload-attachment)
      - [Custom Fields](#custom-fields)
        - [Update Custom Fields](#update-custom-fields)
      - [Tags](#tags)
        - [Update Tags](#update-tags)
      - [Threads](#threads)
        - [List Threads](#list-threads)
        - [Get Thread Original Source (JSON)](#get-thread-original-source-json)
        - [Get Original Source (message/rfc822) (Not Supported)](#get-original-source-messagerfc822-not-supported)
        - [Create Chat Thread](#create-chat-thread)
        - [Create Customer Thread](#create-customer-thread)
        - [Create Note](#create-note)
        - [Create Phone Thread](#create-phone-thread)
        - [Create Reply Thread](#create-reply-thread)
        - [Update Thread](#update-thread)
    - [Customers](#customers)
      - [Customers (CRUD)](#customers-crud)
        - [List Customers](#list-customers)
        - [Get Customer](#get-customer)
        - [Create Customer](#create-customer)
        - [Update Customer](#update-customer)
        - [Overwrite Customer](#overwrite-customer)
      - [Addresses](#addresses)
        - [Get Address](#get-address)
        - [Create Address](#create-address)
        - [Update Address](#update-address)
        - [Delete Address](#delete-address)
      - [Chat Handles](#chat-handles)
        - [List Chats Handles](#list-chats-handles)
        - [Create Chat Handle](#create-chat-handle)
        - [Update Chat Handles](#update-chat-handles)
        - [Delete Chat Handle](#delete-chat-handle)
      - [Emails](#emails)
        - [List Emails](#list-emails)
        - [Create Email](#create-email)
        - [Update Emails](#update-emails)
        - [Delete Email](#delete-email)
      - [Phones](#phones)
        - [List Phones](#list-phones)
        - [Create Phone](#create-phone)
        - [Update Phone](#update-phone)
        - [Delete Phone](#delete-phone)
      - [Social Profile](#social-profile)
        - [List Social Profiles](#list-social-profiles)
        - [Create Social Profile](#create-social-profile)
        - [Update Social Profile](#update-social-profile)
        - [Delete Social Profile](#delete-social-profile)
      - [Websites](#websites)
        - [List Websites](#list-websites)
        - [Create Website](#create-website)
        - [Update Website](#update-website)
        - [Delete Website](#delete-website)
    - [Mailboxes (FULL SUPPORT)](#mailboxes-full-support)
      - [List Mailboxes](#list-mailboxes)
      - [Get Mailbox](#get-mailbox)
      - [List Mailbox Custom Fields](#list-mailbox-custom-fields)
      - [List Mailbox Folders](#list-mailbox-folders)
    - [Properties (FULL SUPPORT)](#properties-full-support)
      - [List Customer Property Definitions](#list-customer-property-definitions)
      - [Update Customer Properties](#update-customer-properties)
    - [Ratings (FULL SUPPORT)](#ratings-full-support)
      - [Get Satisfaction Rating](#get-satisfaction-rating)
    - [Reports (FULL SUPPORT)](#reports-full-support)
      - [Company (FULL SUPPORT)](#company-full-support)
        - [Company Overall Report](#company-overall-report)
        - [Company Customers Helped](#company-customers-helped)
        - [Company Drilldown](#company-drilldown)
      - [Conversations (Reports) (FULL SUPPORT)](#conversations-reports-full-support)
        - [Conversations - Overall Report](#conversations---overall-report)
        - [All Channels - Volumes by Channel](#all-channels---volumes-by-channel)
        - [Conversations - Busiest Time of Day](#conversations---busiest-time-of-day)
        - [Conversations - Drilldown](#conversations---drilldown)
        - [Conversations - Drilldown by Field](#conversations---drilldown-by-field)
        - [Conversations - New Conversations](#conversations---new-conversations)
        - [Conversations - New Conversations Drilldown](#conversations---new-conversations-drilldown)
        - [Conversations - Received Messages Statistics](#conversations---received-messages-statistics)
      - [Docs (FULL SUPPORT)](#docs-full-support)
        - [Docs Overall Report](#docs-overall-report)
      - [Happiness (FULL SUPPORT)](#happiness-full-support)
        - [Happiness Overall Report](#happiness-overall-report)
        - [Happiness Ratings Report](#happiness-ratings-report)
      - [Productivity (FULL SUPPORT)](#productivity-full-support)
        - [Productivity Overall Report](#productivity-overall-report)
        - [Productivity - First Response Time](#productivity---first-response-time)
        - [Productivity - Replies Sent](#productivity---replies-sent)
        - [Productivity - Resolution Time](#productivity---resolution-time)
        - [Productivity - Resolved](#productivity---resolved)
        - [Productivity - Response Time](#productivity---response-time)
      - [User (Full Report)](#user-full-report)
        - [User/Team Overall Report](#userteam-overall-report)
        - [User Conversation History](#user-conversation-history)
        - [User Customers Helped](#user-customers-helped)
        - [User Drilldown](#user-drilldown)
        - [User Happiness](#user-happiness)
        - [User Happiness drilldown](#user-happiness-drilldown)
        - [User Replies](#user-replies)
        - [User Resolutions](#user-resolutions)
      - [Basic (FULL SUPPORT)](#basic-full-support)
        - [Chat Report](#chat-report)
        - [Email Report](#email-report)
        - [Phone Report](#phone-report)
    - [Tags (FULL SUPPORT)](#tags-full-support)
      - [List Tags](#list-tags)
    - [Teams (FULL SUPPORT)](#teams-full-support)
      - [List Teams](#list-teams)
      - [List Team Members](#list-team-members)
    - [Users (FULL SUPPORT)](#users-full-support)
      - [List Users](#list-users)
      - [Get User](#get-user)
      - [Get Resource Owner](#get-resource-owner)
      - [Delete User](#delete-user)
    - [Webhooks (FULL SUPPORT)](#webhooks-full-support)
      - [List Webhooks](#list-webhooks)
      - [Get Webhook](#get-webhook)
      - [Create Webhook](#create-webhook)
      - [Update Webhook](#update-webhook)
      - [Delete Webhook](#delete-webhook)
    - [Workflows (FULL SUPPORT)](#workflows-full-support)
      - [List Workflows](#list-workflows)
      - [Update Workflow Status](#update-workflow-status)
      - [Run Manual Workflows](#run-manual-workflows)

## Installation

```sh
npm install helpscout-api
# OR
yarn add helpscout-api
```

## API Usage

```ts
import HelpScout from 'helpscout-api';

const helpScoutClient = new HelpScout({
  'appId': process.env.HELPSCOUT_APP_ID,
  'appSecret': process.env.HELPSCOUT_APP_SECRET
});
```

### Conversations

#### Conversations (CRUD)

##### List Conversations

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/list/)

```ts
```

##### Get Conversation

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/get/)

```ts
```

##### Create Conversation

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/create/)

```ts
```

##### Update Conversation

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/update/)

```ts
```

##### Delete Conversation

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/delete/)

```ts
```

#### Attachments

##### Get Attachment Data

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/attachments/get-data/)

```ts
```

##### Delete Attachment

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/attachments/delete/)

```ts
```

##### Upload Attachment

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/attachments/create/)

```ts
```

#### Custom Fields

##### Update Custom Fields

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/custom_fields/update/)

```ts
```

#### Tags

##### Update Tags

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/tags/update/)

```ts
```

#### Threads

##### List Threads

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/list/)

```ts
```

##### Get Thread Original Source (JSON)

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/thread-source-json/)

```ts
```

##### Get Original Source (message/rfc822) (Not Supported)

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/thread-source-rfc822/)

##### Create Chat Thread

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/chat/)

```ts
```

##### Create Customer Thread

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/customer/)

```ts
```

##### Create Note

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/note/)

```ts
```

##### Create Phone Thread

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/phone/)

```ts
```

##### Create Reply Thread

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/reply/)

```ts
```

##### Update Thread

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/update/)

```ts
```

### Customers

#### Customers (CRUD)

##### List Customers

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/list/)

```ts
```

##### Get Customer

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/get/)

```ts
```

##### Create Customer

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/create/)

```ts
```

##### Update Customer

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/update/)

```ts
```

##### Overwrite Customer

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/overwrite/)

```ts
```

#### Addresses

##### Get Address

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/address/get/)

```ts
```

##### Create Address

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/address/create/)

```ts
```

##### Update Address

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/address/update/)

```ts
```

##### Delete Address

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/address/delete/)

```ts
```

#### Chat Handles

##### List Chats Handles

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/chat_handles/list/)

```ts
```

##### Create Chat Handle

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/chat_handles/create/)

```ts
```

##### Update Chat Handles

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/chat_handles/update/)

```ts
```

##### Delete Chat Handle

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/chat_handles/delete/)

```ts
```

#### Emails

##### List Emails

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/emails/list/)

```ts
```

##### Create Email

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/emails/create/)

```ts
```

##### Update Emails

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/emails/update/)

```ts
```

##### Delete Email

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/emails/delete/)

```ts
```

#### Phones

##### List Phones

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/phones/list/)

```ts
```

##### Create Phone

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/phones/create/)

```ts
```

##### Update Phone

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/phones/update/)

```ts
```

##### Delete Phone

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/phones/delete/)

```ts
```

#### Social Profile

##### List Social Profiles

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/social_profiles/list/)

```ts
```

##### Create Social Profile

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/social_profiles/create/)

```ts
```

##### Update Social Profile

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/social_profiles/update/)

```ts
```

##### Delete Social Profile

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/social_profiles/delete/)

```ts
```

#### Websites

##### List Websites

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/websites/list/)

```ts
```

##### Create Website

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/websites/create/)

```ts
```

##### Update Website

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/websites/update/)

```ts
```

##### Delete Website

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/customers/websites/delete/)

```ts
```

### Mailboxes (FULL SUPPORT)

#### List Mailboxes

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/mailboxes/list/)

```ts
const page: number = 1; // OPTIONAL - for pagination
const mailboxes = await helpScout.mailboxes.listMailboxes(page);
```

#### Get Mailbox

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/mailboxes/get/)

```ts
const mailboxId: number = 1; // REQUIRED
const mailbox = await helpScout.mailboxes.getMailbox(mailboxId);
```

#### List Mailbox Custom Fields

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/mailboxes/mailbox-fields/)

```ts
const mailboxId: number = 1; // REQUIRED
const mailboxCustomFields = await helpScout.mailboxes.listMailboxCustomFields(mailboxId);
```

#### List Mailbox Folders

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/mailboxes/mailbox-folders/)

```ts
const mailboxId: number = 1; // REQUIRED
const mailboxFolders = await helpScout.mailboxes.listMailboxCustomFields(mailboxId);
```

### Properties (FULL SUPPORT)

#### List Customer Property Definitions

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/properties/list/)

```ts
const customerProperties = await helpScoutClient.properties.listCustomerPropertyDefinitions()
```

#### Update Customer Properties

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/properties/update/)

```ts
const customerId: number = 1;
const body: Array <any> = [{
  'op': 'replace',
  'value': 'Tesla',
  'path': '/car'
}, {
  'op': 'remove',
  'path': '/revenue'
}]
await helpScoutClient.properties.updateCustomerProperties(customerId, body);
```

### Ratings (FULL SUPPORT)

#### Get Satisfaction Rating

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/ratings/get/)

```ts
const ratingId: number = 1; // REQUIRED
const rating: any = await helpScoutClient.ratings.getSatisfactionRating(ratingId);
```

### Reports (FULL SUPPORT)

#### Company (FULL SUPPORT)

##### Company Overall Report

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/company/reports-company-overall/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types };
// Get Report
const report: any = await helpScoutClient.reports.getCompanyOverallReport(reportOptions);
```

##### Company Customers Helped

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/company/reports-company-customers-helped/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getCompanyCustomersHelpedReport(reportOptions);
```

##### Company Drilldown

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/company/reports-company-drilldown/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const range: string = 'replies'; // enumeration: 'replies' OR 'firstReplyResolved' OR 'resolved' OR 'responseTime' OR 'firstResponseTime' OR 'handleTime'
const rangeId: number = 1;
const page: number = 1; // for pagination
const rows: number = 50; // number of result to return per page; defaults to 25; maximum is 50
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getCompanyDrilldownReport(reportOptions);
```

#### Conversations (Reports) (FULL SUPPORT)

##### Conversations - Overall Report

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/conversations/reports-conversations-overall/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types };
// Get Report
const report: any = await helpScoutClient.reports.getConversationsOverallReport(reportOptions);
```

##### All Channels - Volumes by Channel

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/conversations/reports-conversations-volume-by-channel/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getConversationsVolumesByAllChannelsReport(reportOptions);
```

##### Conversations - Busiest Time of Day

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/conversations/reports-conversations-busy-times/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types };
// Get Report
const report: any = await helpScoutClient.reports.getConversationsBusyTimesReport(reportOptions);
```

##### Conversations - Drilldown

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/conversations/reports-conversations-drilldown/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const page: number = 1; // for pagination
const rows: number = 30; // number of result to return per page; defaults to 25; maximum is 50
// Report Options
const reportOptions = { start, end, mailboxes, tags, folders, types, page, rows };
// Get Report
const report: any = await helpScoutClient.reports.getConversationsDrilldownReport(reportOptions);
```

##### Conversations - Drilldown by Field

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/conversations/reports-conversations-field-drilldown/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const field: string = 'tagid'; // enumeration: 'tagid' OR 'replyid' OR 'workflowid' OR 'customerid'
const fieldId: number = 55439; // identifier on which to drill down; can be an identifier representing a tag, saved reply, workflow, or customer
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const page: number = 1; // for pagination
const rows: number = 30; // number of result to return per page; defaults to 25; maximum is 50
// Report Options
const reportOptions = { start, end, field, fieldId, mailboxes, tags, folders, types, page, rows };
// Get Report
const report: any = await helpScoutClient.reports.getConversationsDrilldownByFieldReport(reportOptions);
```

##### Conversations - New Conversations

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/conversations/reports-conversations-new/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getNewConversationsReport(reportOptions);
```

##### Conversations - New Conversations Drilldown

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/conversations/reports-conversations-new-drilldown/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const page: number = 1; // for pagination
const rows: number = 30; // number of result to return per page; defaults to 25; maximum is 50
// Report Options
const reportOptions = { start, end, mailboxes, tags, folders, types, page, rows };
// Get Report
const report: any = await helpScoutClient.reports.getNewConversationsDrilldownReport(reportOptions);
```

##### Conversations - Received Messages Statistics

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/conversations/reports-conversations-received-messages/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getNewConversationsReport(reportOptions);
```

#### Docs (FULL SUPPORT)

##### Docs Overall Report

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/docs/reports-docs-overall/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const sites: Array<string> = ['5215163545667acd25394b5c', '5214c77c45667acd25394b51']; // list of docs site IDs
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, sites };
// Get Report
const report: any = await helpScoutClient.reports.getDocsOverallReport(reportOptions);
```

#### Happiness (FULL SUPPORT)

##### Happiness Overall Report

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/happiness/reports-happiness-overall/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types };
// Get Report
const report: any = await helpScoutClient.reports.getHappinessOverallReport(reportOptions);
```

##### Happiness Ratings Report

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/happiness/reports-happiness-ratings/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const sortField: string = 'number'; // enumeration: 'number' OR 'modifiedAt' OR 'rating'
const sortOrder: string = 'ASC'; // enumeration: 'ASC' OR 'DESC'
const rating: string = 'great'; // enumeration: 'great' OR 'ok' OR 'all' OR 'not-good'
const page: number = 1;
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, sortField, sortOrder, rating, page };
// Get Report
const report: any = await helpScoutClient.reports.getHappinessRatingsReport(reportOptions);
```

#### Productivity (FULL SUPPORT)

##### Productivity Overall Report

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/productivity/reports-productivity-overall/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const officeHours: boolean = true; // defaults to false
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, officeHours };
// Get Report
const report: any = await helpScoutClient.reports.getProductivityOverallReport(reportOptions);
```

##### Productivity - First Response Time

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/productivity/reports-productivity-first-response-time/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const officeHours: boolean = true; // defaults to false
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, officeHours, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getProductivityFirstResponseTimeReport(reportOptions);
```

##### Productivity - Replies Sent

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/productivity/reports-productivity-replies-sent/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const officeHours: boolean = true; // defaults to false
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, officeHours, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getProductivityRepliesSentReport(reportOptions);
```

##### Productivity - Resolution Time

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/productivity/reports-productivity-resolution-time/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const officeHours: boolean = true; // defaults to false
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, officeHours, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getProductivityResolutionTimeReport(reportOptions);
```

##### Productivity - Resolved

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/productivity/reports-productivity-resolved/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const officeHours: boolean = true; // defaults to false
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, officeHours, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getProductivityResolvedReport(reportOptions);
```

##### Productivity - Response Time

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/productivity/reports-productivity-respose-time/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const officeHours: boolean = true; // defaults to false
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { start, end, previousStart, previousEnd, mailboxes, tags, folders, types, officeHours, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getProductivityResponseTimeReport(reportOptions);
```

#### User (Full Report)

##### User/Team Overall Report

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/user/reports-user/)

```ts
// URL Parameters
const user: number = 447723; // user id
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const officeHours: boolean = true; // defaults to false
// Report Options
const reportOptions = { user, start, end, previousStart, previousEnd, mailboxes, tags, folders, types, officeHours };
// Get Report
const report: any = await helpScoutClient.reports.getUserConversationHistoryReport(reportOptions);
```

##### User Conversation History

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/user/reports-user-conversation-history/)

```ts
// URL Parameters
const user: number = 447723; // user id
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const officeHours: boolean = true; // defaults to false
const sortField: string = 'number'; // enumeration: 'number' OR 'repliesSent' OR 'responseTviewByDescriptionime' OR 'resolveTime'
const sortOrder: string = 'ASC'; // enumeration: 'ASC' OR 'DESC'
const page: number = 1; // for pagination
// Report Options
const reportOptions = { user, start, end, previousStart, previousEnd, mailboxes, tags, folders, types, officeHours, sortField, sortOrder, page };
// Get Report
const report: any = await helpScoutClient.reports.getUserConversationHistoryReport(reportOptions);
```

##### User Customers Helped

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/user/reports-user-customer-helped/)

```ts
// URL Parameters
const user: number = 447723; // user id
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { user, start, end, previousStart, previousEnd, mailboxes, tags, folders, types, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getUserCustomersHelpedReport(reportOptions);
```

##### User Drilldown

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/user/reports-user-drilldown/)

```ts
// URL Parameters
const user: number = 447723; // user id
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const page: number = 1; // for pagination
const rows: number = 30; // number of result to return per page; defaults to 25; maximum is 50
// Report Options
const reportOptions = { user, start, end, mailboxes, tags, folders, types, page, rows };
// Get Report
const report: any = await helpScoutClient.reports.getUserDrilldownReport(reportOptions);
```

##### User Happiness

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/user/reports-user-happiness/)

```ts
// URL Parameters
const user: number = 447723; // user id
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
// Report Options
const reportOptions = { user, start, end, previousStart, previousEnd, mailboxes, tags, folders, types };
// Get Report
const report: any = await helpScoutClient.reports.getUserHappinessReport(reportOptions);
```

##### User Happiness drilldown

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/user/reports-user-happiness-drilldown/)

```ts
// URL Parameters
const user: number = 447723; // user id
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const page: number = 1; // for pagination
const rating: string = 'great'; // enumeration: 'great' OR 'ok' OR 'all' OR 'not-good'
const sortField: string = 'number'; // enumeration: 'number' OR 'modifiedAt' OR 'rating'
const sortOrder: string = 'ASC'; // enumeration: 'ASC' OR 'DESC'
// Report Options
const reportOptions = { user, start, end, previousStart, previousEnd, mailboxes, tags, folders, types, page, rating, sortField, sortOrder };
// Get Report
const report: any = await helpScoutClient.reports.getUserHappinessDrilldownReport(reportOptions);
```

##### User Replies

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/user/reports-user-replies/)

```ts
// URL Parameters
const user: number = 447723; // user id
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { user, start, end, previousStart, previousEnd, mailboxes, tags, folders, types, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getUserRepliesReport(reportOptions);
```

##### User Resolutions

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/user/reports-user-resolutions/)

```ts
// URL Parameters
const user: number = 447723; // user id
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const types: string = 'email'; // enumeration: 'email' OR 'chat' OR 'phone'
const viewBy: string = 'day'; // enumeration: 'day' OR 'week' OR 'month'
// Report Options
const reportOptions = { user, start, end, previousStart, previousEnd, mailboxes, tags, folders, types, viewBy };
// Get Report
const report: any = await helpScoutClient.reports.getUserResolutionsReport(reportOptions);
```

#### Basic (FULL SUPPORT)

##### Chat Report

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/chat/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const officeHours: boolean = true; // default is false
// Report Options
const reportOptions: any = { start, end, previousStart, previousEnd, mailboxes, tags, folders, officeHours };
// Get Report
const report = await helpScoutClient.reports.getChatReport(reportOptions);
```

##### Email Report

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/email/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const officeHours: boolean = true; // default is false
// Report Options
const reportOptions: any = { start, end, previousStart, previousEnd, mailboxes, tags, folders, officeHours };
// Get Report
const report = await helpScoutClient.reports.getChatReport(reportOptions);
```

##### Phone Report

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/reports/phone/)

```ts
// URL Parameters
const start: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const end: string = '2019-06-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousStart: string = '2019-04-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const previousEnd: string = '2019-05-02T12:00:00Z'; // date - YYYY-MM-DDThh:mm:ssZ
const mailboxes: Array<number> = [123, 567]; // list of ids to filter on mailboxes
const tags: Array<number> = [5666, 99787]; // list of ids to filter on tags
const folders: Array<number> = [991, 992]; // list of folder ids to filter on folders
const officeHours: boolean = true; // default is false
// Report Options
const reportOptions: any = { start, end, previousStart, previousEnd, mailboxes, tags, folders, officeHours };
// Get Report
const report = await helpScoutClient.reports.getChatReport(reportOptions);
```

### Tags (FULL SUPPORT)

#### List Tags

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/tags/list/)

```ts
const page: number = 1; // OPTIONAL - for pagination
const tags: Array<any> = await helpScoutClient.tags.listTags(page);
```

### Teams (FULL SUPPORT)

#### List Teams

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/teams/list-teams/)

```ts
const page: number = 1; // OPTIONAL - for pagination
const teams: Array<any> = await helpScoutClient.teams.listTeams(page);
```

#### List Team Members

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/teams/list-team-members/)

```ts
const teamId: number = 1; // REQUIRED
const page: number = 1; // OPTIONAL - for pagination
const members: Array<any> = await helpScoutClient.teams.listTeamMembers(teamId, page);
```

### Users (FULL SUPPORT)

#### List Users

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/users/list/)

```ts
const page: number = 1; // OPTIONAL - for pagination
const users: Array<any> = await helpScoutClient.users.listUsers(page);
```

#### Get User

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/users/get/)

```ts
const userId: number = 1; // REQUIRED
const user: Array<any> = await helpScoutClient.users.getUser(userId);
```

#### Get Resource Owner

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/users/me/)

```ts
const user: Array<any> = await helpScoutClient.users.getResourceOwner();
```

#### Delete User

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/users/delete/)

```ts
const userId: number = 1; // REQUIRED
await helpScoutClient.users.deleteUser(userId);
```

### Webhooks (FULL SUPPORT)

#### List Webhooks

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/webhooks/list/)

```ts
const page: number = 1; // OPTIONAL - for pagination
const webhooks: Array<any> = await helpScoutClient.webhooks.listWebhooks(page)
```

#### Get Webhook

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/webhooks/get/)

```ts
const webhookId: number = 1; // REQUIRED
const webhook: any = await helpScoutClient.webhooks.getWebhook(webhookId);
```

#### Create Webhook

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/webhooks/create/)

```ts
const url: string = 'https://example.com'; // REQUIRED
const events: Array<string> = ['convo.assigned', 'convo.moved']; // REQUIRED
const secret: string = 'mZ9XbGHodX'; // REQUIRED
const payloadVersion: string = 'V2'; // REQUIRED - 'V1' OR 'V2', V2 is recommended
const label: string = 'my webhook'; // REQUIRED
const body = { url, events, secret, payloadVersion, label };
await helpScoutClient.webhooks.createWebhook(body);
```

#### Update Webhook

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/webhooks/update/)

```ts
const webhookId: number = 10; // REQUIRED
const url: string = 'https://example.com'; // REQUIRED
const events: Array<string> = ['convo.assigned', 'convo.moved']; // REQUIRED
const secret: string = 'mZ9XbGHodX'; // REQUIRED
const payloadVersion: string = 'V2'; // REQUIRED - 'V1' OR 'V2', V2 is recommended
const label: string = 'my webhook'; // REQUIRED
const body = { url, events, secret, payloadVersion, label };
await helpScoutClient.webhooks.updateWebhook(webhookId, body);
```

#### Delete Webhook

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/webhooks/delete/)

```ts
const webhookId: number = 10; // REQUIRED
await helpScoutClient.webhooks.deleteWebhook(webhookId);
```

### Workflows (FULL SUPPORT)

#### List Workflows

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/workflows/list/)

```ts
const page: number = 1; // OPTIONAL - for pagination
const workflows: Array<any> = await helpScoutClient.workflows.listWorkflows(page);
```

#### Update Workflow Status

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/workflows/update/)

```ts
const workflowId: number = 1; // REQUIRED
const status: string = 'active'; // 'active' OR 'inactive'
await helpScoutClient.workflows.updateWorkflowStatus(workflowId, status);
```

#### Run Manual Workflows

[Docs](https://developer.helpscout.com/mailbox-api/endpoints/workflows/run/)

```ts
const workflowId: number = 1; // REQUIRED
const conversationIds: Array<number> = [2, 3, 4, 5]; // REQUIRED
await helpScoutClient.workflows.runManualWorkflows(workflowId, conversationIds);
```
