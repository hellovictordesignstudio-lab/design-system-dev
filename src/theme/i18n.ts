/**
 * i18n translations
 * Supports: English (en), Spanish (es), French (fr)
 */

export type Language = 'en' | 'es' | 'fr';

export type TranslationKey =
  // General
  | 'general.documentation'
  | 'general.components'
  | 'general.tokens'
  | 'general.changelog'
  | 'general.viewSource'
  | 'general.copyCode'
  | 'general.codeCopied'
  | 'general.openInNewTab'
  // Theme
  | 'theme.toggleMode'
  | 'theme.lightMode'
  | 'theme.darkMode'
  | 'theme.systemMode'
  | 'theme.language'
  // Components
  | 'components.button'
  | 'components.input'
  | 'components.badge'
  | 'components.card'
  | 'components.alert'
  | 'components.avatar'
  | 'components.tooltip'
  | 'components.spinner'
  // Button props
  | 'button.clickMe'
  | 'button.submit'
  | 'button.cancel'
  | 'button.loading'
  | 'button.disabled'
  | 'button.primary'
  | 'button.secondary'
  | 'button.ghost'
  | 'button.danger'
  // Badge
  | 'badge.new'
  | 'badge.beta'
  | 'badge.deprecated'
  // Stories
  | 'stories.welcome'
  | 'stories.welcomeSubtitle'
  | 'stories.gettingStarted'
  | 'stories.installation'
  | 'stories.usage'
  | 'stories.overview'
  | 'stories.playground'
  | 'stories.variants'
  | 'stories.sizes'
  | 'stories.states'
  | 'stories.examples'
  // FileUpload
  | 'fileupload.dropHere'
  | 'fileupload.dragOrBrowse'
  | 'fileupload.browse'
  | 'fileupload.uploading'
  | 'fileupload.removeFile'
  // NotificationCenter
  | 'notifications.title'
  | 'notifications.markAllRead'
  | 'notifications.empty'
  | 'notifications.viewAll'
  | 'notifications.all'
  | 'notifications.unread';

type TranslationMap = Record<TranslationKey, string>;

const en: TranslationMap = {
  'general.documentation':    'Documentation',
  'general.components':       'Components',
  'general.tokens':           'Tokens',
  'general.changelog':        'Changelog',
  'general.viewSource':       'View source',
  'general.copyCode':         'Copy code',
  'general.codeCopied':       'Copied!',
  'general.openInNewTab':     'Open in new tab',
  'theme.toggleMode':         'Toggle color mode',
  'theme.lightMode':          'Light',
  'theme.darkMode':           'Dark',
  'theme.systemMode':         'System',
  'theme.language':           'Language',
  'components.button':        'Button',
  'components.input':         'Input',
  'components.badge':         'Badge',
  'components.card':          'Card',
  'components.alert':         'Alert',
  'components.avatar':        'Avatar',
  'components.tooltip':       'Tooltip',
  'components.spinner':       'Spinner',
  'button.clickMe':           'Click me',
  'button.submit':            'Submit',
  'button.cancel':            'Cancel',
  'button.loading':           'Loading…',
  'button.disabled':          'Disabled',
  'button.primary':           'Primary',
  'button.secondary':         'Secondary',
  'button.ghost':             'Ghost',
  'button.danger':            'Danger',
  'badge.new':                'New',
  'badge.beta':               'Beta',
  'badge.deprecated':         'Deprecated',
  'stories.welcome':          'Welcome to the Design System',
  'stories.welcomeSubtitle':  'A professional component library built with React, TypeScript and Styled Components.',
  'stories.gettingStarted':   'Getting Started',
  'stories.installation':     'Installation',
  'stories.usage':            'Usage',
  'stories.overview':         'Overview',
  'stories.playground':       'Playground',
  'stories.variants':         'Variants',
  'stories.sizes':            'Sizes',
  'stories.states':           'States',
  'stories.examples':         'Examples',
  'fileupload.dropHere':      'Drop files here',
  'fileupload.dragOrBrowse':  'Drag & drop or browse',
  'fileupload.browse':        'browse',
  'fileupload.uploading':     'Uploading…',
  'fileupload.removeFile':    'Remove file',
  'notifications.title':      'Notifications',
  'notifications.markAllRead':'Mark all as read',
  'notifications.empty':      "You're all caught up",
  'notifications.viewAll':    'View all notifications',
  'notifications.all':        'All',
  'notifications.unread':     'Unread',
};

const es: TranslationMap = {
  'general.documentation':    'Documentación',
  'general.components':       'Componentes',
  'general.tokens':           'Tokens',
  'general.changelog':        'Registro de cambios',
  'general.viewSource':       'Ver código fuente',
  'general.copyCode':         'Copiar código',
  'general.codeCopied':       '¡Copiado!',
  'general.openInNewTab':     'Abrir en nueva pestaña',
  'theme.toggleMode':         'Cambiar modo de color',
  'theme.lightMode':          'Claro',
  'theme.darkMode':           'Oscuro',
  'theme.systemMode':         'Sistema',
  'theme.language':           'Idioma',
  'components.button':        'Botón',
  'components.input':         'Campo de texto',
  'components.badge':         'Etiqueta',
  'components.card':          'Tarjeta',
  'components.alert':         'Alerta',
  'components.avatar':        'Avatar',
  'components.tooltip':       'Globo de ayuda',
  'components.spinner':       'Cargador',
  'button.clickMe':           'Haz clic',
  'button.submit':            'Enviar',
  'button.cancel':            'Cancelar',
  'button.loading':           'Cargando…',
  'button.disabled':          'Deshabilitado',
  'button.primary':           'Principal',
  'button.secondary':         'Secundario',
  'button.ghost':             'Fantasma',
  'button.danger':            'Peligro',
  'badge.new':                'Nuevo',
  'badge.beta':               'Beta',
  'badge.deprecated':         'Obsoleto',
  'stories.welcome':          'Bienvenido al Sistema de Diseño',
  'stories.welcomeSubtitle':  'Una biblioteca de componentes profesional construida con React, TypeScript y Styled Components.',
  'stories.gettingStarted':   'Comenzar',
  'stories.installation':     'Instalación',
  'stories.usage':            'Uso',
  'stories.overview':         'Vista general',
  'stories.playground':       'Explorador',
  'stories.variants':         'Variantes',
  'stories.sizes':            'Tamaños',
  'stories.states':           'Estados',
  'stories.examples':         'Ejemplos',
  'fileupload.dropHere':      'Suelta los archivos aquí',
  'fileupload.dragOrBrowse':  'Arrastra y suelta o explora',
  'fileupload.browse':        'explorar',
  'fileupload.uploading':     'Subiendo…',
  'fileupload.removeFile':    'Eliminar archivo',
  'notifications.title':      'Notificaciones',
  'notifications.markAllRead':'Marcar todo como leído',
  'notifications.empty':      'Estás al día',
  'notifications.viewAll':    'Ver todas las notificaciones',
  'notifications.all':        'Todas',
  'notifications.unread':     'Sin leer',
};

const fr: TranslationMap = {
  'general.documentation':    'Documentation',
  'general.components':       'Composants',
  'general.tokens':           'Jetons',
  'general.changelog':        'Journal des modifications',
  'general.viewSource':       'Voir le code source',
  'general.copyCode':         'Copier le code',
  'general.codeCopied':       'Copié !',
  'general.openInNewTab':     'Ouvrir dans un nouvel onglet',
  'theme.toggleMode':         'Changer le mode de couleur',
  'theme.lightMode':          'Clair',
  'theme.darkMode':           'Sombre',
  'theme.systemMode':         'Système',
  'theme.language':           'Langue',
  'components.button':        'Bouton',
  'components.input':         'Champ de saisie',
  'components.badge':         'Badge',
  'components.card':          'Carte',
  'components.alert':         'Alerte',
  'components.avatar':        'Avatar',
  'components.tooltip':       'Infobulle',
  'components.spinner':       'Indicateur de chargement',
  'button.clickMe':           'Cliquez ici',
  'button.submit':            'Soumettre',
  'button.cancel':            'Annuler',
  'button.loading':           'Chargement…',
  'button.disabled':          'Désactivé',
  'button.primary':           'Principal',
  'button.secondary':         'Secondaire',
  'button.ghost':             'Fantôme',
  'button.danger':            'Danger',
  'badge.new':                'Nouveau',
  'badge.beta':               'Bêta',
  'badge.deprecated':         'Obsolète',
  'stories.welcome':          'Bienvenue dans le Système de Design',
  'stories.welcomeSubtitle':  'Une bibliothèque de composants professionnelle construite avec React, TypeScript et Styled Components.',
  'stories.gettingStarted':   'Démarrage',
  'stories.installation':     'Installation',
  'stories.usage':            'Utilisation',
  'stories.overview':         'Aperçu',
  'stories.playground':       'Bac à sable',
  'stories.variants':         'Variantes',
  'stories.sizes':            'Tailles',
  'stories.states':           'États',
  'stories.examples':         'Exemples',
  'fileupload.dropHere':      'Déposez les fichiers ici',
  'fileupload.dragOrBrowse':  'Glisser-déposer ou parcourir',
  'fileupload.browse':        'parcourir',
  'fileupload.uploading':     'Envoi en cours…',
  'fileupload.removeFile':    'Supprimer le fichier',
  'notifications.title':      'Notifications',
  'notifications.markAllRead':'Tout marquer comme lu',
  'notifications.empty':      'Vous êtes à jour',
  'notifications.viewAll':    'Voir toutes les notifications',
  'notifications.all':        'Toutes',
  'notifications.unread':     'Non lues',
};

export const translations: Record<Language, TranslationMap> = { en, es, fr };

export function createTranslator(lang: Language) {
  return function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations['en'][key] ?? key;
  };
}
