/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/

import * as path from "path";
import * as minimist from "minimist";
import { Config } from "@bentley/imodeljs-clients";
import { IModelJsConfig } from "@bentley/config-loader/lib/IModelJsConfig";
import { OidcAgentClientConfiguration } from "@bentley/imodeljs-clients-backend/lib/OidcAgentClient";

/** Credentials for test users */
export interface UserCredentials {
    email: string;
    password: string;
}
// Use IModelJS config to initialize if it is present
IModelJsConfig.init(true, false, Config.App);

/* Command line argument object */
const argv = minimist(process.argv);

/* Configuration for Query Agent: uses provided command if necessary first, second it will attempt to look
   for the npm config generated environment variable, third it will use hard coded values. */
export class QueryAgentConfig {
    // IModelJS and Environment Variable Keys
    private static _appPort = "agent_app_port";
    private static _appListenTime = "agent_app_listen_time";
    private static _appIModelName = "agent_app_imodel_name";
    private static _appProjectName = "agent_app_project_name";
    private static _appLoggingCategory = "agent_app_logging_category";
    private static _appOutputDir = "agent_app_output_dir";
    private static _appOidcClientId = "agent_test_oidc_client_id";
    private static _appOidcClientSecret = "agent_test_oidc_client_secret";
    private static _appServiceUserEmail = "agent_test_oidc_service_user_name";
    private static _appServiceUserPassword = "agent_test_oidc_service_password";
    private static _imjsBuddiRegion = "imjs_buddi_resolve_url_using_region";
    private static _imjsBuddiUrl = "imjs_buddi_url";
    private static _connectAppName = "imjs_connect_app_name";
    private static _connectAppVersion = "imjs_connect_app_version";
    private static _connectAppGuid = "imjs_connect_app_guid";
    private static _connectDeviceId  = "imjs_connect_device_id";
    private static _defaultRelyingPartyUri = "imjs_default_relying_party_uri";

    /*------------------------------------------------------ FILL THESE OUT -------------------------------------------------------------------------------------------*/
    public static get oidcClientId(): string {
        return Config.App.getString(QueryAgentConfig._appOidcClientId, process.env.oidc_client_id || "YOUR_CLIENT_HERE");
    }
    public static get oidcClientSecret(): string {
        return Config.App.getString(QueryAgentConfig._appOidcClientSecret, process.env.oidc_client_secret || "YOUR_CLIENT_SECRET HERE");
    }
    public static get serviceUserEmail(): string {
        return Config.App.getString(QueryAgentConfig._appServiceUserEmail, argv.email || process.env.service_user_email || "YOUR_SERVICE_USER_EMAIL");
    }
    public static get serviceUserPassword(): string {
        return Config.App.getString(QueryAgentConfig._appServiceUserPassword, argv.password || process.env.service_user_password || "YOUR_SERVICE_USER_PASSWORD");
    }
    public static get connectAppName(): string {
        return Config.App.getString(QueryAgentConfig._connectAppName, process.env.connect_app_name || "YOUR_CONNECT_APP_NAME");
    }
    public static get connectAppVersion(): string {
        return Config.App.getString(QueryAgentConfig._connectAppVersion, process.env.connect_app_version || "YOUR_CONNECT_APP_VERSION");
    }
    public static get connectAppGuid(): string {
        return Config.App.getString(QueryAgentConfig._connectAppGuid, process.env.connect_app_guid || "YOUR_CONNECT_APP_GUID");
    }
    public static get connectDeviceId(): string {
        return Config.App.getString(QueryAgentConfig._connectDeviceId, process.env.connect_device_id || "YOUR_CONNECT_DEVICE_ID");
    }
    public static get defaultRelyingPartyUri(): string {
        return Config.App.getString(QueryAgentConfig._defaultRelyingPartyUri, process.env.default_relying_party_uri || "YOUR_DEFAULT_RELYING_PARTY_URI");
    }
    public static get iModelName(): string {
        return Config.App.getString(QueryAgentConfig._appIModelName, process.env.agent_app_imodel_name || "YOUR_IMODEL_NAME");
    }
    public static get projectName(): string {
        return Config.App.getString(QueryAgentConfig._appProjectName, process.env.agent_app_project_name || "YOUR_PROJECT_NAME");
    }
    /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public static get oidcAgentClientConfiguration(): OidcAgentClientConfiguration {
        return {
            clientId: QueryAgentConfig.oidcClientId,
            clientSecret: QueryAgentConfig.oidcClientSecret,
            serviceUserEmail: QueryAgentConfig.serviceUserEmail,
            serviceUserPassword: QueryAgentConfig.serviceUserPassword,
        };
    }
    public static get oidcUserCredentials(): UserCredentials {
        const user: UserCredentials = {
            email: QueryAgentConfig.serviceUserEmail,
            password: QueryAgentConfig.serviceUserPassword,
        };
        return user;
    }
    public static get iModelJsAppConfig(): any {
        // Necessary config for using iModelJs
        const appConfig = {
            // OIDC related
            imjs_connect_app_name: QueryAgentConfig.connectAppName,
            imjs_connect_app_version: QueryAgentConfig.connectAppVersion,
            imjs_connect_app_guid: QueryAgentConfig.connectAppGuid,
            imjs_connect_device_id: QueryAgentConfig.connectDeviceId,
            imjs_default_relying_party_uri: QueryAgentConfig.defaultRelyingPartyUri,
            // Buddi Url Resolution Config
            imjs_buddi_url: QueryAgentConfig.buddiUrl,
            imjs_buddi_resolve_url_using_region: QueryAgentConfig.buddiRegion,
            agent_app_listen_time: QueryAgentConfig.listenTime,
            agent_test_oidc_client_id: QueryAgentConfig.oidcClientId,
            agent_test_oidc_client_secret: QueryAgentConfig.oidcClientSecret,
            agent_test_oidc_service_user_name: QueryAgentConfig.serviceUserEmail,
            agent_test_oidc_service_password: QueryAgentConfig.serviceUserPassword,
            agent_test_connect_app_name: QueryAgentConfig.connectAppName,

            agent_app_imodel_name: QueryAgentConfig.iModelName,
            agent_app_project_name: QueryAgentConfig.projectName,
        };
        return appConfig;
    }
    public static get port(): number {
        return Config.App.getNumber(QueryAgentConfig._appPort, argv.port || process.env.agent_app_port || 3000);
    }
    public static get listenTime(): number {
        return Config.App.getNumber(QueryAgentConfig._appListenTime, parseFloat(process.env.agent_app_listen_time!) || 40000);
    }
    public static get loggingCategory(): string {
        return Config.App.getString(QueryAgentConfig._appLoggingCategory, process.env.agent_app_logging_category || "imodel-query-agent");
    }
    public static get outputDir(): string {
        return Config.App.getString(QueryAgentConfig._appOutputDir, path.join(__dirname, "output"));
    }
    public static get changeSummaryDir(): string {
        return path.join(QueryAgentConfig.outputDir, "changeSummaries");
    }
    //  Dev:103, QA:102, Prod: 0, Perf:294
    public static get buddiRegion(): string {
        return Config.App.getString(QueryAgentConfig._imjsBuddiRegion, process.env.imjs_buddi_resolve_url_using_region || "103");
    }
    public static get buddiUrl(): string {
        return Config.App.getString(QueryAgentConfig._imjsBuddiUrl, process.env.imjs_buddi_url || "https://buddi.bentley.com/WebService");
    }
}
