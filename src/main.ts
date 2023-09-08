import app from './app/index'
import env from './config/config.default'
const { APP_PORT } = env

app.listen(APP_PORT, () => {
    console.log("running...");
})