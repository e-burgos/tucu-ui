/**
 * Built-in UI strings for tucu-ui components, keyed by the theme `lang`
 * (`ThemeProvider lang="es"` or `useTheme().setLang`). Components read them
 * through `useTucuMessages()`; plain functions (validators) take `lang`.
 */

export type TucuLang = 'en' | 'es' | 'fr';

export interface TucuMessages {
  validation: {
    required: string;
    requiredEmail: string;
    email: string;
    phone: string;
    url: string;
    cuit: string;
    number: string;
  };
  input: {
    showPassword: string;
    hidePassword: string;
    openDatePicker: string;
    previousMonth: string;
    nextMonth: string;
    today: string;
    /** `{index}` and `{length}` are replaced. */
    pinDigit: string;
    /** `{name}` is replaced. */
    removeFile: string;
  };
  toast: {
    region: string;
    dismiss: string;
  };
  select: {
    placeholder: string;
    search: string;
    noResults: string;
    clearSearch: string;
  };
  datatable: {
    perPage: string;
    /** `{from}`, `{to}` and `{total}` are replaced. */
    range: string;
    /** `{from}` and `{total}` are replaced. */
    showing: string;
    noData: string;
    noDataDescription: string;
    errorData: string;
    errorDataDescription: string;
    contactSupport: string;
    firstPage: string;
    previousPage: string;
    nextPage: string;
    lastPage: string;
    rowsPerPage: string;
    rowActions: string;
    columns: string;
    manageColumns: string;
    visibleColumns: string;
    showAll: string;
    hideAll: string;
  };
  switch: {
    on: string;
    off: string;
  };
  dialog: {
    close: string;
  };
  themeMode: {
    label: string;
    switchToDark: string;
    switchToLight: string;
  };
  accessDenied: {
    title: string;
    description: string;
    action: string;
    login: string;
  };
}

export const TUCU_MESSAGES: Record<TucuLang, TucuMessages> = {
  en: {
    validation: {
      required: 'This field is required.',
      requiredEmail: 'Enter an email address.',
      email: 'Enter a valid email address, e.g. name@example.com.',
      phone: 'Enter a valid phone number.',
      url: 'Enter a valid URL, e.g. https://example.com.',
      cuit: 'Enter a valid CUIT/CUIL (11 digits).',
      number: 'Enter a valid number.',
    },
    input: {
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      openDatePicker: 'Open date picker',
      previousMonth: 'Previous month',
      nextMonth: 'Next month',
      today: 'Today',
      pinDigit: 'Digit {index} of {length}',
      removeFile: 'Remove {name}',
    },
    toast: {
      region: 'Notifications',
      dismiss: 'Dismiss notification',
    },
    select: {
      placeholder: 'Select an option',
      search: 'Search...',
      noResults: 'No results',
      clearSearch: 'Clear search',
    },
    datatable: {
      perPage: 'per page:',
      range: '{from}-{to} of {total}',
      showing: 'Showing {from} of {total} rows',
      noData: 'No available data',
      noDataDescription:
        'There is no data based on the selected criteria. Please try adjusting your filters or refreshing the page to ensure any recent changes are reflected.',
      errorData: 'There was a problem loading the data',
      errorDataDescription:
        'Please try again refreshing the page or the selected content. If the problem continues or you need help, contact our Support Team.',
      contactSupport: 'Contact Support',
      firstPage: 'First page',
      previousPage: 'Previous page',
      nextPage: 'Next page',
      lastPage: 'Last page',
      rowsPerPage: 'Rows per page',
      rowActions: 'Row actions',
      columns: 'Columns',
      manageColumns: 'Manage Columns',
      visibleColumns: 'Visible Columns',
      showAll: 'Show All',
      hideAll: 'Hide All',
    },
    switch: {
      on: 'ON',
      off: 'OFF',
    },
    dialog: {
      close: 'Close',
    },
    themeMode: {
      label: 'Mode',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
    },
    accessDenied: {
      title: 'Access denied',
      description: 'You are not authorized to access this page. Go back to the home page.',
      action: 'Go to home',
      login: 'Log in',
    },
  },
  es: {
    validation: {
      required: 'Este campo es obligatorio.',
      requiredEmail: 'Ingresá un email.',
      email: 'Ingresá un email válido, por ejemplo nombre@ejemplo.com.',
      phone: 'Ingresá un teléfono válido.',
      url: 'Ingresá una URL válida, por ejemplo https://ejemplo.com.',
      cuit: 'Ingresá un CUIT/CUIL válido (11 dígitos).',
      number: 'Ingresá un número válido.',
    },
    input: {
      showPassword: 'Mostrar contraseña',
      hidePassword: 'Ocultar contraseña',
      openDatePicker: 'Abrir calendario',
      previousMonth: 'Mes anterior',
      nextMonth: 'Mes siguiente',
      today: 'Hoy',
      pinDigit: 'Dígito {index} de {length}',
      removeFile: 'Quitar {name}',
    },
    toast: {
      region: 'Notificaciones',
      dismiss: 'Cerrar notificación',
    },
    select: {
      placeholder: 'Seleccioná una opción',
      search: 'Buscar...',
      noResults: 'Sin resultados',
      clearSearch: 'Limpiar búsqueda',
    },
    datatable: {
      perPage: 'por página:',
      range: '{from}-{to} de {total}',
      showing: 'Mostrando {from} de {total} filas',
      noData: 'No hay datos disponibles',
      noDataDescription:
        'No hay datos para los criterios seleccionados. Probá ajustar los filtros o actualizar la página.',
      errorData: 'Hubo un problema al cargar los datos',
      errorDataDescription:
        'Probá actualizar la página. Si el problema continúa o necesitás ayuda, contactá a soporte.',
      contactSupport: 'Contactar a soporte',
      firstPage: 'Primera página',
      previousPage: 'Página anterior',
      nextPage: 'Página siguiente',
      lastPage: 'Última página',
      rowsPerPage: 'Filas por página',
      rowActions: 'Acciones de la fila',
      columns: 'Columnas',
      manageColumns: 'Administrar columnas',
      visibleColumns: 'Columnas visibles',
      showAll: 'Mostrar todas',
      hideAll: 'Ocultar todas',
    },
    switch: {
      on: 'SÍ',
      off: 'NO',
    },
    dialog: {
      close: 'Cerrar',
    },
    themeMode: {
      label: 'Modo',
      switchToDark: 'Cambiar a modo oscuro',
      switchToLight: 'Cambiar a modo claro',
    },
    accessDenied: {
      title: 'Acceso denegado',
      description: 'No tenés permiso para ver esta página. Volvé a la página de inicio.',
      action: 'Ir al inicio',
      login: 'Iniciar sesión',
    },
  },
  fr: {
    validation: {
      required: 'Ce champ est obligatoire.',
      requiredEmail: 'Saisissez une adresse e-mail.',
      email: 'Saisissez une adresse e-mail valide, ex. nom@exemple.com.',
      phone: 'Saisissez un numéro de téléphone valide.',
      url: 'Saisissez une URL valide, ex. https://exemple.com.',
      cuit: 'Saisissez un CUIT/CUIL valide (11 chiffres).',
      number: 'Saisissez un nombre valide.',
    },
    input: {
      showPassword: 'Afficher le mot de passe',
      hidePassword: 'Masquer le mot de passe',
      openDatePicker: 'Ouvrir le calendrier',
      previousMonth: 'Mois précédent',
      nextMonth: 'Mois suivant',
      today: "Aujourd'hui",
      pinDigit: 'Chiffre {index} sur {length}',
      removeFile: 'Retirer {name}',
    },
    toast: {
      region: 'Notifications',
      dismiss: 'Fermer la notification',
    },
    select: {
      placeholder: 'Sélectionnez une option',
      search: 'Rechercher...',
      noResults: 'Aucun résultat',
      clearSearch: 'Effacer la recherche',
    },
    datatable: {
      perPage: 'par page :',
      range: '{from}-{to} sur {total}',
      showing: 'Affichage de {from} sur {total} lignes',
      noData: 'Aucune donnée disponible',
      noDataDescription:
        "Aucune donnée ne correspond aux critères sélectionnés. Essayez d'ajuster les filtres ou d'actualiser la page.",
      errorData: 'Un problème est survenu lors du chargement des données',
      errorDataDescription:
        "Essayez d'actualiser la page. Si le problème persiste ou si vous avez besoin d'aide, contactez le support.",
      contactSupport: 'Contacter le support',
      firstPage: 'Première page',
      previousPage: 'Page précédente',
      nextPage: 'Page suivante',
      lastPage: 'Dernière page',
      rowsPerPage: 'Lignes par page',
      rowActions: 'Actions de la ligne',
      columns: 'Colonnes',
      manageColumns: 'Gérer les colonnes',
      visibleColumns: 'Colonnes visibles',
      showAll: 'Tout afficher',
      hideAll: 'Tout masquer',
    },
    switch: {
      on: 'OUI',
      off: 'NON',
    },
    dialog: {
      close: 'Fermer',
    },
    themeMode: {
      label: 'Mode',
      switchToDark: 'Passer en mode sombre',
      switchToLight: 'Passer en mode clair',
    },
    accessDenied: {
      title: 'Accès refusé',
      description: "Vous n'êtes pas autorisé à accéder à cette page. Revenez à la page d'accueil.",
      action: "Aller à l'accueil",
      login: 'Se connecter',
    },
  },
};

/** Normalizes any BCP-47-ish tag (`es-AR`, `EN`) to a supported lang. */
export function resolveTucuLang(lang?: string | null): TucuLang {
  const code = (lang || '').slice(0, 2).toLowerCase();
  return code === 'es' || code === 'fr' ? code : 'en';
}

export function getTucuMessages(lang?: string | null): TucuMessages {
  return TUCU_MESSAGES[resolveTucuLang(lang)];
}

/** Replaces `{key}` placeholders in a message template. */
export function formatMessage(
  template: string,
  params: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in params ? String(params[key]) : match
  );
}

/** Maps a lang to the default locale used for dates and numbers. */
export function langToLocale(lang?: string | null): string {
  const resolved = resolveTucuLang(lang);
  return resolved === 'es' ? 'es-AR' : resolved === 'fr' ? 'fr-FR' : 'en-US';
}
