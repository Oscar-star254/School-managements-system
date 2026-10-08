import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import FirstVisit from './pages/FirstVisit'
import Events, { EventDetail } from './pages/Events'
import Leaders from './pages/Leaders'
import Groups from './pages/Groups'
import Sermons from './pages/Sermons'
import Blog, { BlogPost_ } from './pages/Blog'
import { useParams } from 'react-router'
import Gallery from './pages/Gallery'
import Testimonies from './pages/Testimonies'
import Prayer from './pages/Prayer'
import Serve from './pages/Serve'
import Resources from './pages/Resources'
import Parents from './pages/Parents'
import Giving from './pages/Giving'
import Contact from './pages/Contact'
import Members from './pages/Members'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

function BlogPostWrapper() {
  const { id } = useParams()
  return BlogPost_({ id: id! })
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'first-visit', Component: FirstVisit },
      { path: 'events', Component: Events },
      { path: 'events/:id', Component: EventDetail },
      { path: 'leaders', Component: Leaders },
      { path: 'groups', Component: Groups },
      { path: 'sermons', Component: Sermons },
      { path: 'blog', Component: Blog },
      { path: 'blog/:id', Component: BlogPostWrapper },
      { path: 'gallery', Component: Gallery },
      { path: 'testimonies', Component: Testimonies },
      { path: 'prayer', Component: Prayer },
      { path: 'serve', Component: Serve },
      { path: 'resources', Component: Resources },
      { path: 'parents', Component: Parents },
      { path: 'giving', Component: Giving },
      { path: 'contact', Component: Contact },
      { path: 'members', Component: Members },
      { path: 'admin', Component: Admin },
      { path: '*', Component: NotFound },
    ],
  },
])
