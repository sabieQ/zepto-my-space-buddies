import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PhoneShell } from './components/PhoneShell'
import { HomePage } from './pages/HomePage'
import { MySpacePage } from './pages/MySpacePage'
import { SharedListsPage } from './pages/SharedListsPage'
import { TrendingPage } from './pages/TrendingPage'
import { SurprisePage } from './pages/SurprisePage'
import { SettingsPage } from './pages/SettingsPage'
import { ListPage } from './pages/ListPage'
import { BuddiesPage } from './pages/BuddiesPage'
import { ChatPage } from './pages/ChatPage'
import { ProductPage } from './pages/ProductPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PhoneShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-space" element={<MySpacePage />} />
          <Route path="/my-space/shared" element={<SharedListsPage />} />
          <Route path="/my-space/trending" element={<TrendingPage />} />
          <Route path="/my-space/surprise" element={<SurprisePage />} />
          <Route path="/my-space/settings" element={<SettingsPage />} />
          <Route path="/list/:id" element={<ListPage />} />
          <Route path="/buddies" element={<BuddiesPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/categories"
            element={<PlaceholderPage title="Categories" icon="grid_view" />}
          />
          <Route path="/fresh" element={<PlaceholderPage title="Fresh" icon="eco" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
