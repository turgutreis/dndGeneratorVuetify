import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
/* add icons to the library */
library.add(fas)

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "fa" || "fas" || "faSvg",
    }
});
