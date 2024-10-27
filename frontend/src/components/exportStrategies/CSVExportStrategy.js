// exportStrategies/CSVExportStrategy.js
import ExportStrategy from "./ExportStrategy";

class CSVExportStrategy extends ExportStrategy {
    generateExport(data) {
        const csvRows = data.map(row =>
            `"${row.id}","${row.title}","${row.author}","${row.genreName}","${row.publicationDate}","${row.isbn}"`
        );
        return `ID,Title,Author,Genre,Publication Date,ISBN\n${csvRows.join("\n")}`;
    }
}

export default CSVExportStrategy;
