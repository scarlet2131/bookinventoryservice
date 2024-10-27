// exportStrategies/ExportFactory.js
import CSVExportStrategy from "./CSVExportStrategy";
import JSONExportStrategy from "./JSONExportStrategy";

class ExportFactory {
    static getExportStrategy(format) {
        switch (format) {
            case "csv":
                return new CSVExportStrategy();
            case "json":
                return new JSONExportStrategy();
            default:
                throw new Error("Unsupported format");
        }
    }
}

export default ExportFactory;
