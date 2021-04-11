import React from 'react';
import IntlMessages from '../../../../utility/IntlMessages';

const folderList = [
  {id: 121, name: 'Inbox', alias: 'inbox', icon: 'mail'},
  {id: 122, name: 'Sent', alias: 'sent', icon: 'person'},
  {id: 123, name: 'Draft', alias: 'draft', icon: 'drafts'},
  {id: 124, name: 'Starred', alias: 'starred', icon: 'starBorder'},
  {id: 125, name: 'Spam', alias: 'spam', icon: 'infoSharp'},
  {id: 126, name: 'Trash', alias: 'trash', icon: 'delete'},
  {id: 127, name: 'Archive', alias: 'archive', icon: 'archive'},
];
export default folderList;

export const mailListMessages = (type) => {
  switch (type) {
    case 125: {
      return <IntlMessages id='mail.sentToSpam' />;
    }
    case 126: {
      return <IntlMessages id='mail.sentTrash' />;
    }
    case 127: {
      return <IntlMessages id='mail.archived' />;
    }
    default: {
      return <IntlMessages id='mail.updated' />;
    }
  }
};
