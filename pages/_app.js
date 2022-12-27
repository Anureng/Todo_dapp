import { ToDoListContext, ToDoListProvider } from '../context/TodoListApp'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => (
  <ToDoListProvider>
    <div>
      <Component {...pageProps} />
    </div>
  </ToDoListProvider>
)

export default App