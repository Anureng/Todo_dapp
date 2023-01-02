import { ToDoListContext, ToDoListProvider } from '../context/TodoListApp'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => (
  <ToDoListProvider>
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500"'>
      <Component {...pageProps} />
    </div>
  </ToDoListProvider>
)

export default App