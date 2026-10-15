/**
 * Built-in UI strings for tucu-ui components, keyed by the theme `lang`
 * (`ThemeProvider lang="es"` or `useTheme().setLang`). Components read them
 * through `useTucuMessages()`; plain functions (validators) take `lang`.
 */

export type TucuLang = 'en' | 'es' | 'fr';

export interface TucuMessages {
  validation: {
    required: string;
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
  };
  toast: {
    region: string;
    dismiss: string;
  };
  datatable: {
    perPage: string;
    /** `{from}`, `{to}` and `{total}` are replaced. */
    range: string;
    /** `{from}` and `{total}` are replaced. */
    showing: string;
    noData: string;
    noDataDescription: string;
    firstPage: string;
    previousPage: string;
    nextPage: string;
    lastPage: string;
    rowsPerPage: string;
  };
}

export const TUCU_MESSAGES: Record<TucuLang, TucuMessages> = {
  en: {
    validation: {
      required: 'This field is required.',
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
    },
    toast: {
      region: 'Notifications',
      dismiss: 'Dismiss notification',
    },
    datatable: {
      perPage: 'per page:',
      range: '{from}-{to} of {total}',
      showing: 'Showing {from} of {total} rows',
      noData: 'No available data',
      noDataDescription:
        'There is no data based on the selected criteria. Please try adjusting your filters or refreshing the page to ensure any recent changes are reflected.',
      firstPage: 'First page',
      previousPage: 'Previous page',
      nextPage: 'Next page',
      lastPage: 'Last page',
      rowsPerPage: 'Rows per page',
    },
  },
  es: {
    validation: {
      required: 'Este campo es obligatorio.',
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
    },
    toast: {
      region: 'Notificaciones',
      dismiss: 'Cerrar notificación',
    },
    datatable: {
      perPage: 'por página:',
      range: '{from}-{to} de {total}',
      showing: 'Mostrando {from} de {total} filas',
      noData: 'No hay datos disponibles',
      noDataDescription:
        'No hay datos para los criterios seleccionados. Probá ajustar los filtros o actualizar la página.',
      firstPage: 'Primera página',
      previousPage: 'Página anterior',
      nextPage: 'Página siguiente',
      lastPage: 'Última página',
      rowsPerPage: 'Filas por página',
    },
  },
  fr: {
    validation: {
      required: 'Ce champ est obligatoire.',
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
    },
    toast: {
      region: 'Notifications',
      dismiss: 'Fermer la notification',
    },
    datatable: {
      perPage: 'par page :',
      range: '{from}-{to} sur {total}',
      showing: 'Affichage de {from} sur {total} lignes',
      noData: 'Aucune donnée disponible',
      noDataDescription:
        "Aucune donnée ne correspond aux critères sélectionnés. Essayez d'ajuster les filtres ou d'actualiser la page.",
      firstPage: 'Première page',
      previousPage: 'Page précédente',
      nextPage: 'Page suivante',
      lastPage: 'Dernière page',
      rowsPerPage: 'Lignes par page',
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
