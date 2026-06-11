import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";

export default function Inprogress() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <Card className="max-w-md w-full p-6 text-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />

                    <h2 className="text-xl font-semibold">
                        Page In Progress
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        This feature is currently under development.
                        Please check back soon.
                    </p>

                    <Button variant="outline" onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                </div>
            </Card>
        </div>
    );
}
