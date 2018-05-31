const PACKAGE = require('./package.json');
const normalBanner =
`${PACKAGE.name} - ${PACKAGE.version}
Copyright (c) 2018, Yeonwoo Jo
Lisensed under the ${PACKAGE.licenses[0].type}

Contacts
  Github : github.com/byeolbit
  Email : Yeonwoo.jo.92@gmil.com
  
You can find this project at ${PACKAGE.homepage}`;

const jqueryBanner =
`${PACKAGE.name} - ${PACKAGE.version}
Copyright (c) 2018, Yeonwoo Jo
Lisensed under the ${PACKAGE.licenses[0].type}

Dependencies:
  jQuery: ${PACKAGE.dependencies.jquery}

Contacts
  Github : github.com/byeolbit
  Email : Yeonwoo.jo.92@gmil.com
  
You can find this project at ${PACKAGE.homepage}`;

module.exports = {normalBanner, jqueryBanner};
