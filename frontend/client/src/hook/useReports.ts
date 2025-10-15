import { useState } from "react"
import { getAllReports } from "@api/reportsApi"
import { Reports, ReportFilter } from "@/types"
import { useQuery } from "@tanstack/react-query"

export default function useReports() {
    const [filter, setFilter] = useState<ReportFilter>("Disponibles");
    
    const { data: reports = [], isLoading, error } = useQuery({
        queryKey: ['reports', 'all'],
        queryFn: getAllReports,
    });

    const disponiblesCount = reports.filter((report) => report.status === "Disponibles").length;

    const pendientesCount = reports.filter((report) => report.status === "Pendientes").length;

    const filteredReports = reports.filter((report) => report.status === filter);

    return { 
        reports, 
        disponiblesCount, 
        pendientesCount, 
        filteredReports, 
        filter, 
        setFilter,
        isLoading,
        error
    }
}