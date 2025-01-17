export interface OperationsConfiguration {
	// defaultConfig is the base for all configurations
	// all configuration shared across queries, mutations and subscriptions can be done in the default config
	defaultConfig: BaseOperationConfiguration;

	// queries lets you define the base config for all Queries
	// the input config is the defaultConfig object
	queries: ConfigureQuery;

	mutations: ConfigureMutation;
	subscriptions: ConfigureSubscription;

	// custom allows you to override settings for each individual operation
	// the input config is the default config + the query/mutation/subscription extra config
	custom?: {
		AddMessage?: CustomizeMutation;
		AllUsers?: CustomizeQuery;
		DeleteAllMessagesByUserEmail?: CustomizeMutation;
		Messages?: CustomizeQuery;
		MockQuery?: CustomizeQuery;
	};
}

export interface BaseOperationConfiguration {
	authentication: {
		required: boolean;
	};
}

export interface QueryConfiguration extends BaseOperationConfiguration {
	caching: {
		enable: boolean;
		public: boolean;
		maxAge: number;
		staleWhileRevalidate: number;
	};
	liveQuery: {
		enable: boolean;
		pollingIntervalSeconds: number;
	};
}

export interface MutationConfiguration extends BaseOperationConfiguration {}

export interface SubscriptionConfiguration extends BaseOperationConfiguration {}

export type OperationConfiguration = QueryConfiguration | MutationConfiguration | SubscriptionConfiguration;

export type ConfigureOperation = (config: OperationConfiguration) => OperationConfiguration;
export type ConfigureQuery = (config: BaseOperationConfiguration) => QueryConfiguration;
export type CustomizeQuery = (config: QueryConfiguration) => QueryConfiguration;
export type ConfigureMutation = (config: BaseOperationConfiguration) => MutationConfiguration;
export type CustomizeMutation = (config: MutationConfiguration) => MutationConfiguration;
export type ConfigureSubscription = (config: BaseOperationConfiguration) => SubscriptionConfiguration;
export type CustomizeSubscription = (config: SubscriptionConfiguration) => SubscriptionConfiguration;

export const configureWunderGraphOperations = (config: OperationsConfiguration) => config;
