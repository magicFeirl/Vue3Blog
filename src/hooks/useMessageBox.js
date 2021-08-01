import {
  createApp
} from 'vue'

import MessageBox from '@/components/Message'

export default (message, type = 'normal', timeout = 3000) => {
  const app = createApp(MessageBox, {
    message,
    type
  });

  const div = document.createElement('div');
  document.body.appendChild(div);

  app.mount(div)

  setTimeout(() => {
    app.unmount();
  }, timeout)
}