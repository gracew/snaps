/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/nonces": {
    get: {
      parameters: {
        query: {
          wallet_address?: parameters["rowFilter.nonces.wallet_address"];
          nonce?: parameters["rowFilter.nonces.nonce"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["nonces"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** nonces */
          nonces?: definitions["nonces"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          wallet_address?: parameters["rowFilter.nonces.wallet_address"];
          nonce?: parameters["rowFilter.nonces.nonce"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          wallet_address?: parameters["rowFilter.nonces.wallet_address"];
          nonce?: parameters["rowFilter.nonces.nonce"];
        };
        body: {
          /** nonces */
          nonces?: definitions["nonces"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/recipient_emails": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.recipient_emails.id"];
          snaps_id?: parameters["rowFilter.recipient_emails.snaps_id"];
          recipient_email?: parameters["rowFilter.recipient_emails.recipient_email"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["recipient_emails"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** recipient_emails */
          recipient_emails?: definitions["recipient_emails"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.recipient_emails.id"];
          snaps_id?: parameters["rowFilter.recipient_emails.snaps_id"];
          recipient_email?: parameters["rowFilter.recipient_emails.recipient_email"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.recipient_emails.id"];
          snaps_id?: parameters["rowFilter.recipient_emails.snaps_id"];
          recipient_email?: parameters["rowFilter.recipient_emails.recipient_email"];
        };
        body: {
          /** recipient_emails */
          recipient_emails?: definitions["recipient_emails"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/snaps": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.snaps.id"];
          created_at?: parameters["rowFilter.snaps.created_at"];
          sender_id?: parameters["rowFilter.snaps.sender_id"];
          recipient_type?: parameters["rowFilter.snaps.recipient_type"];
          recipient_fname?: parameters["rowFilter.snaps.recipient_fname"];
          recipient_wallet_address?: parameters["rowFilter.snaps.recipient_wallet_address"];
          category?: parameters["rowFilter.snaps.category"];
          note?: parameters["rowFilter.snaps.note"];
          minted_at?: parameters["rowFilter.snaps.minted_at"];
          minted_token_id?: parameters["rowFilter.snaps.minted_token_id"];
          created_transaction?: parameters["rowFilter.snaps.created_transaction"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["snaps"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** snaps */
          snaps?: definitions["snaps"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.snaps.id"];
          created_at?: parameters["rowFilter.snaps.created_at"];
          sender_id?: parameters["rowFilter.snaps.sender_id"];
          recipient_type?: parameters["rowFilter.snaps.recipient_type"];
          recipient_fname?: parameters["rowFilter.snaps.recipient_fname"];
          recipient_wallet_address?: parameters["rowFilter.snaps.recipient_wallet_address"];
          category?: parameters["rowFilter.snaps.category"];
          note?: parameters["rowFilter.snaps.note"];
          minted_at?: parameters["rowFilter.snaps.minted_at"];
          minted_token_id?: parameters["rowFilter.snaps.minted_token_id"];
          created_transaction?: parameters["rowFilter.snaps.created_transaction"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.snaps.id"];
          created_at?: parameters["rowFilter.snaps.created_at"];
          sender_id?: parameters["rowFilter.snaps.sender_id"];
          recipient_type?: parameters["rowFilter.snaps.recipient_type"];
          recipient_fname?: parameters["rowFilter.snaps.recipient_fname"];
          recipient_wallet_address?: parameters["rowFilter.snaps.recipient_wallet_address"];
          category?: parameters["rowFilter.snaps.category"];
          note?: parameters["rowFilter.snaps.note"];
          minted_at?: parameters["rowFilter.snaps.minted_at"];
          minted_token_id?: parameters["rowFilter.snaps.minted_token_id"];
          created_transaction?: parameters["rowFilter.snaps.created_transaction"];
        };
        body: {
          /** snaps */
          snaps?: definitions["snaps"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/users": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.users.id"];
          created_at?: parameters["rowFilter.users.created_at"];
          email?: parameters["rowFilter.users.email"];
          wallet_address?: parameters["rowFilter.users.wallet_address"];
          fname?: parameters["rowFilter.users.fname"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["users"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** users */
          users?: definitions["users"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.users.id"];
          created_at?: parameters["rowFilter.users.created_at"];
          email?: parameters["rowFilter.users.email"];
          wallet_address?: parameters["rowFilter.users.wallet_address"];
          fname?: parameters["rowFilter.users.fname"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.users.id"];
          created_at?: parameters["rowFilter.users.created_at"];
          email?: parameters["rowFilter.users.email"];
          wallet_address?: parameters["rowFilter.users.wallet_address"];
          fname?: parameters["rowFilter.users.fname"];
        };
        body: {
          /** users */
          users?: definitions["users"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/get_received_snaps_with_sender": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            recipient_wallet_address: string;
            /** Format: text */
            recipient_email: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/get_snaps_with_sender": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: uuid */
            snaps_id: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/matches_recipient_email": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: uuid */
            snaps_id: string;
            /** Format: text */
            user_email: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/lookup_wallet_address_from_email": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: uuid */
            snaps_id: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  nonces: {
    /**
     * Format: text
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    wallet_address: string;
    /**
     * Format: uuid
     * @default extensions.uuid_generate_v4()
     */
    nonce?: string;
  };
  recipient_emails: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `snaps.id`.<fk table='snaps' column='id'/>
     */
    snaps_id: string;
    /** Format: text */
    recipient_email: string;
  };
  snaps: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
    /** Format: uuid */
    sender_id: string;
    /** Format: text */
    recipient_type: string;
    /** Format: text */
    recipient_fname?: string;
    /** Format: text */
    recipient_wallet_address?: string;
    /** Format: text */
    category?: string;
    /** Format: text */
    note?: string;
    /** Format: timestamp without time zone */
    minted_at?: string;
    /** Format: integer */
    minted_token_id?: number;
    /** Format: boolean */
    created_transaction?: boolean;
  };
  users: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    email?: string;
    /** Format: text */
    wallet_address?: string;
    /** Format: text */
    fname?: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description nonces */
  "body.nonces": definitions["nonces"];
  /** Format: text */
  "rowFilter.nonces.wallet_address": string;
  /** Format: uuid */
  "rowFilter.nonces.nonce": string;
  /** @description recipient_emails */
  "body.recipient_emails": definitions["recipient_emails"];
  /** Format: uuid */
  "rowFilter.recipient_emails.id": string;
  /** Format: uuid */
  "rowFilter.recipient_emails.snaps_id": string;
  /** Format: text */
  "rowFilter.recipient_emails.recipient_email": string;
  /** @description snaps */
  "body.snaps": definitions["snaps"];
  /** Format: uuid */
  "rowFilter.snaps.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.snaps.created_at": string;
  /** Format: uuid */
  "rowFilter.snaps.sender_id": string;
  /** Format: text */
  "rowFilter.snaps.recipient_type": string;
  /** Format: text */
  "rowFilter.snaps.recipient_fname": string;
  /** Format: text */
  "rowFilter.snaps.recipient_wallet_address": string;
  /** Format: text */
  "rowFilter.snaps.category": string;
  /** Format: text */
  "rowFilter.snaps.note": string;
  /** Format: timestamp without time zone */
  "rowFilter.snaps.minted_at": string;
  /** Format: integer */
  "rowFilter.snaps.minted_token_id": string;
  /** Format: boolean */
  "rowFilter.snaps.created_transaction": string;
  /** @description users */
  "body.users": definitions["users"];
  /** Format: uuid */
  "rowFilter.users.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.users.created_at": string;
  /** Format: text */
  "rowFilter.users.email": string;
  /** Format: text */
  "rowFilter.users.wallet_address": string;
  /** Format: text */
  "rowFilter.users.fname": string;
}

export interface operations {}

export interface external {}
