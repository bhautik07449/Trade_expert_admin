import { Card } from '../../../components/ui/card';
import CommonTable from '../../../components/widgets/common_table';

export default function Consolidate() {
    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Develop Prepositions</h3>
                <h4 className="h6-bold">Total: {list?.length || 0}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <CommonTable
                    columns={columns}
                    rows={list || []}
                    loading={loader}
                    showEdit={false}
                    showDelete={true}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
}