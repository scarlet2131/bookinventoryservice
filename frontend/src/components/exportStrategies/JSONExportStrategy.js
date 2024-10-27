// exportStrategies/JSONExportStrategy.js
import ExportStrategy from "./ExportStrategy";

class JSONExportStrategy extends ExportStrategy {
    generateExport(data) {
        return JSON.stringify(data, null, 2);
    }
}

export default JSONExportStrategy;
