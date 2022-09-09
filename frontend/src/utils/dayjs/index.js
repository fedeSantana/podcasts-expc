import dayjs from "dayjs";

import "dayjs/locale/es";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.locale("es");

export default dayjs;
