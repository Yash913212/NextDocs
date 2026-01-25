import { Header } from '@/components/Header'

export default function LocaleLayout({ children, params }) {
  return (
    <>
      <Header locale={params.locale} version="v1" />
      <div className="pt-16">{children}</div>
    </>
  )
}
