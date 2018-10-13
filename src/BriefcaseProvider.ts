/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/

import { AccessToken } from "@bentley/imodeljs-clients";
import { ActivityLoggingContext, Guid } from "@bentley/bentleyjs-core";
import { IModelDb, OpenParams, AccessMode } from "@bentley/imodeljs-backend";
import { IModelVersion } from "@bentley/imodeljs-common";
export class BriefcaseProvider {
    private _iModelDb?: IModelDb;
    public async getBriefcase(accessToken: AccessToken, projectId: string, iModelId: string, changeSetId: string): Promise<IModelDb> {
        const actLogCtx = new ActivityLoggingContext(Guid.createValue());
        if (!this._iModelDb) {
            // Open a new local briefcase of the iModel at the specified version
            this._iModelDb = await IModelDb.open(actLogCtx, accessToken, projectId, iModelId, OpenParams.pullOnly(AccessMode.Exclusive), IModelVersion.asOfChangeSet(changeSetId));
        } else {
            // Update the existing local briefcase of the iModel to the specified version
            await this._iModelDb.pullAndMergeChanges(actLogCtx, accessToken!, IModelVersion.asOfChangeSet(changeSetId));
        }
        return this._iModelDb;
    }
}
