import { useTranslation } from 'react-i18next'

type FieldHeadingProps = {
  rows: number
  columns: number
}

export function FieldHeading({ rows, columns }: FieldHeadingProps) {
  const { t } = useTranslation()
  return (
    <div className="field-heading">
      <span className="field-indicator" aria-hidden="true" />
      <div>
        <p className="panel-overline">{t('boardLabel')}</p>
        <p className="field-description">{t('boardDescription', { rows, columns })}</p>
      </div>
    </div>
  )
}
